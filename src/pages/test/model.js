import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'

const { queryTestList } = api

export default modelExtend(pageModel, {
  namespace: 'test',

  state: {
    text: '测试hahah'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/test', location.pathname)) {
          const payload = location.query
          dispatch({ type: 'query', payload })
        }
      })
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryTestList, payload)
      const { success, data, total } = res
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: total
            }
          }
        })
      } else {
        throw data
      }
    }
  }

})
