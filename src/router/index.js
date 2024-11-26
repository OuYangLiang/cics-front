import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue')},
  { path: '/user', component: () => import('../views/user/Page.vue')},
  { path: '/guidaoheng', component: () => import('../views/guidaoheng/Page.vue')},
  { path: '/qichecheng', component: () => import('../views/qichecheng/Page.vue')},
  { path: '/meicaiyang', component: () => import('../views/meicaiyang/Page.vue')},
  { path: '/pidaimeicaiyang', component: () => import('../views/pidaimeicaiyang/Page.vue')},
  { path: '/meizhi', component: () => import('../views/meizhi/Page.vue')},
  { path: '/huayandan', component: () => import('../views/huayandan/Page.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router