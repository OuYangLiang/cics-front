import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue')},
  { path: '/user', component: () => import('../views/user/Page.vue')},
  { path: '/guidaoheng', component: () => import('../views/guidaoheng/Page.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router