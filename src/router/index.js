import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: '/:menu', component: HomeView },
  { path: '/login', component: () => import('../views/LoginView.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router