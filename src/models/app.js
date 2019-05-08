import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import api from 'api'
import config from 'config'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'

const { queryRouteList, logoutUser, queryUserInfo } = api

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: { // 访问权限
      visit: []
    },
    routeList: [{ // 菜单列表
      id: '1',
      icon: 'laptop',
      name: '控制台',
      router: '/dashboard'
    }],
    locationPathname: '',
    locationQuery: {},
    theme: 'light', // 主题
    collapsed: store.get('collapsed') || false, // 菜单展开、收起
    notifications: [] // 通知消息
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query
          }
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window
        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel('cancel request')
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
    }
  },
  effects: {
    // put 触发action， call 调用异步逻辑, select 获取state数据

    // 查询
    *query({ payload }, { call, put, select }) {
      const { success, user } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (success && user) {
        const { list } = yield call(queryRouteList)
        const { permissions } = user
        let routeList = list
        if ( permissions.role === ROLE_TYPE.ADMIN) {
          permissions.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true
            ]
            return cases.every(_ => _)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            routeList
          }
        })
        if (pathMatchRegexp(['/','/login'], window.location.pathname)) {
          router.push({ pathname: '/dashboard' })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({ from: locationPathname })
        })
      }
    },

    // 退出
    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [{
              id: '1',
              icon: 'laptop',
              name: '控制台',
              router: '/dashboard'
            }]
          }
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *goback() {
      router.push({ pathname: '/hmap' })
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    }
  }
}
