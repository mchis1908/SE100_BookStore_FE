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
  }
  next();
});

export default router
