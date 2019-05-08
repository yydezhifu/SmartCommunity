import { router } from 'utils'
import key from 'keymaster'

export default {

  namespace: 'hmap',

  state: {
    visible: false,
    title: '标题'
  },

  effects: {
    *switch({ payload }, { put }) {
      router.push('/dashboard')
    }
  },

  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('esc', () => {
        dispatch({ type: 'hideModal' })
      });
    }
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, visible: true }
    },

    hideModal(state) {
      return { ...state, visible: false }
    }
  }
}
