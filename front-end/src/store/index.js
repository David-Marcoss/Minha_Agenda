import { createStore } from 'vuex'
import user from './modules/User'
import calendar from './modules/Calendar';

export default createStore({

  state:{
    notification: {
      show: false,
      msg: null,
      type: null,
    },
  },
  mutations:{
    setNotification(state, data) {
      state.notification = data;
    },
  },
  modules: {
    user,
    calendar
  }
})