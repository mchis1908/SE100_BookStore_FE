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
    invoiceToPrint:null,
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
    setInvoiceToPrint(state, payload) {
      state.invoiceToPrint = payload;
    },
  },
  actions: actions,
  modules: {
  }
})
