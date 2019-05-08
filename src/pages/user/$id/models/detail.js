import { pathMatchRegexp } from 'utils'
import api from 'api'
import modelExtend from 'dva-model-extend'
import { model } from 'utils/model'

const { queryUser } = api

export default modelExtend(model, {
  namespace: 'userDetail',

  state: {
    data: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/user/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    }
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      const { success, message, status, ...other } = data
      if (success) {
        yield put({
          type: 'updateState',
          payload: { data: other }
        })
      } else {
        throw data
      }
    }
  }
})
