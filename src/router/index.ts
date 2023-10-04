import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/login.vue'
import DashBoard from '../views/dashboard/dashboard.vue'
import Statistics from '../views/statistics/statistics.vue'
import UserManagement from '@/views/user-management/user-management.vue'
import Events from '@/views/events/events.vue'
import Expenses from '@/views/expenses/expenses.vue'
import Invoices from '@/views/invoices/invoices.vue'
import Reports from '@/views/reports/reports.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/user-management',
    name: 'users-management',
    component: UserManagement
  },
  {
    path: '/events',
    name: 'events',
    component: Events
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: Expenses
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
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

export default router
