import { createStore } from 'vuex'
import actions from "./actions";

export default createStore({
  state: {
    userData:null,
    customer:null,
    employee:null,
    manager:null,
    expense:null,
    invoice:null,
    preorder:null,
  },
  getters: {
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload;
    },
    setCustomer(state, payload) {
      state.customer = payload;
    },
    setEmployee(state, payload) {
      state.employee = payload;
    },
    setManager(state, payload) {
      state.manager = payload;
    },
    setExpense(state, payload) {
      state.expense = payload;
    },
    setInvoice(state, payload) {
      state.invoice = payload;
    },
    setPreOrder(state, payload) {
      state.preorder = payload;
    },
  },
  actions: actions,
  modules: {
  }
})
