import { createStore } from 'vuex'
import actions from "./actions";

export default createStore({
  state: {
    userData:null,
  },
  getters: {
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  actions: actions,
  modules: {
  }
})
