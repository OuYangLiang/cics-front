import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";

import HomeView2 from "@/views/HomeView2.vue";

const routes = [
  { path: '/', component: HomeView },
  { path: '/home', component: HomeView2},
  { path: '/login', component: () => import('../views/LoginView.vue')}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router