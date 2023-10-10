import { createStore } from 'vuex'
import actions from "./actions";

export default createStore({
  state: {
    userData:null,
    customerId:null,
    employeeId:null,
    managerId:null,
  },
  getters: {
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
    setCustomer(state, payload) {
      state.customerId = payload;
    },
    setEmployee(state, payload) {
      state.employeeId = payload;
    },
    setManager(state, payload) {
      state.managerId = payload;
    },
  },
  actions: actions,
  modules: {
  }
})
