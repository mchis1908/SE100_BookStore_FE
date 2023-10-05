import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/login.vue'
import DashBoard from '../views/dashboard/dashboard.vue'
import Statistics from '../views/statistics/statistics.vue'
import UserManagement from '@/views/user-management/user-management.vue'
import Events from '@/views/events/events.vue'
import Expenses from '@/views/expenses/expenses.vue'
import Invoices from '@/views/invoices/invoices.vue'
import Reports from '@/views/reports/reports.vue'

import store from "@/store";
import { MutationTypes } from "@/store/mutation-types";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
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
    name: 'users-management',
    component: UserManagement,
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
    path: '/reports',
    name: 'reports',
    component: Reports,
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
  let userData:any = store.state.userData;
  console.log(userData);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userData) {
      next({ path: "/" });
      return;
    }
  }
  next();
});

export default router
