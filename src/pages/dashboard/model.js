import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import moment from 'moment'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

const { queryDashboard, queryWeather } = api

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '武汉',
      temperature: '30',
      name: '晴',
      icon: '//s5.sencdn.com/web/icons/3d_50/2.png'
    },
    sales: [],
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    quote: { avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236' },
    user: { avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236' }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => { // 路由监听
        if (pathMatchRegexp('/dashboard', pathname) || pathMatchRegexp('/', pathname)) {
          dispatch({ type: 'query' })
          dispatch({ type: 'queryWeather' })
        }
      })
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryDashboard, parse(payload))
      yield put({ type: 'updateState', payload: data })
    },
    *queryWeather({ payload = {} }, { call, put }) {
      payload.location = 'wuhan'
      const result = yield call(queryWeather, payload)
      const { success } = result
      if (success) {
        const data = result.results[0]
        const weather = {
          city: data.location.name,
          temperature: data.now.temperature,
          name: data.now.text,
          icon: `//s5.sencdn.com/web/icons/3d_50/${data.now.code}.png`,
          dateTime: moment(data.last_update).format("YYYY-MM-DD")
        }
        yield put({
          type: 'updateState',
          payload: { weather }
        })
      }
    },
  },
})
