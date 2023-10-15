import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/login.vue'
import DashBoard from '../views/dashboard/dashboard.vue'
import Statistics from '../views/statistics/statistics.vue'
import UserManagement from '@/views/user-management/user-management.vue'
import BookManagement from '@/views/book-management/book-management.vue'
import Events from '@/views/events/events.vue'
import Expenses from '@/views/expenses/expenses.vue'
import Invoices from '@/views/invoices/invoices.vue'
import Salary from '@/views/salary/salary.vue'
import Revenue from '@/views/revenue/revenue.vue'
import Reports from '@/views/reports/reports.vue'
import CustomerBooks from '@/views/customer-books/customer-books.vue'
import CustomerInvoices from '@/views/customer-invoices/customer-invoices.vue'
import CustomerVouchers from '@/views/customer-vouchers/customer-vouchers.vue'
import Customers from '@/views/customers/customers.vue'
import Refunds from '@/views/refunds/refunds.vue'
import PreOrder from '@/views/pre-order/pre-order.vue'
import SellingBooks from '@/views/selling-books/selling-books.vue'
import ReportProblem from '@/views/report-problems/report-problems.vue'
import Home from '@/views/home/home.vue'

import store from "@/store";
import { MutationTypes } from "@/store/mutation-types";
const getUserData = async () => {
  const sessionTokens = JSON.parse(localStorage.getItem("sessionTokens")!);
  if (!sessionTokens) return;
  const subject_id = sessionTokens;
  const payload = {
    subject_id,
  };
  const res = await store.dispatch(
    MutationTypes.GET_CURRENT_USER,
    payload
  );
  if (!res) return;
  if (res.status === 200) {
    store.commit("setUserData", res.data);
    return
  }
};
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user-management',
    name: 'user-management',
    component: UserManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/book-management',
    name: 'book-management',
    component: BookManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: Expenses,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/salary',
    name: 'salary',
    component: Salary,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/revenue',
    name: 'revenue',
    component: Revenue,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer-books',
    name: 'customer-books',
    component: CustomerBooks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer-invoices',
    name: 'customer-invoices',
    component: CustomerInvoices,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customer-vouchers',
    name: 'customer-vouchers',
    component: CustomerVouchers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/selling-books',
    name: 'selling-books',
    component: SellingBooks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/refunds',
    name: 'refunds',
    component: Refunds,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/report-problems',
    name: 'report-problems',
    component: ReportProblem,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/pre-order',
    name: 'pre-order',
    component: PreOrder,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
  return;
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let userData:any = await getUserData();
    userData = store.state.userData;
    if (!userData) {
      next({ path: "/" });
      return;
    }
    userData = store.state.userData;
    if (!userData) {
      await getUserData();
    }
    userData = store.state.userData;

    if (userData?.data?.role==='customer') {
      if (['/', '/home', '/dashboard','/user-management','/book-management','/events','/statistics','/expenses','/invoices','/salary','/revenue','/reports','customers','/selling-books','/refunds','/report-problems','/pre-order'].includes(to.path)) {
        next({ path: "/customer-books" });
        return;
      } 
    }else if (userData?.data?.role==='admin') {
      if (['/', '/home', '/customer-books', '/customer-invoices','/customer-vouchers', 'customers','/selling-books','/refunds','/report-problems','/pre-order'].includes(to.path)) {
        next({ path: "/dashboard" });
        return;
      } 
    } else if (userData?.data?.role==='employee'){
      if (['/', '/dashboard', '/home', '/customer-books', '/customer-invoices','/customer-vouchers','/', '/home', '/dashboard','/user-management','/events','/statistics','/expenses','/invoices','/salary','/revenue','/reports'].includes(to.path)) {
        next({ path: "/selling-books" });
        return;
      } 
    }
  }
  next();
});

export default router
