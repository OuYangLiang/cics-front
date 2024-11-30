import { createRouter, createWebHashHistory } from "vue-router";

import LoginLayout from "@/layouts/LoginLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
      path: '/login', 
      component: () => import('../views/LoginView.vue'),
      meta: {
          layout: LoginLayout
      }
  },
  {
      path: '/user', 
      component: () => import('../views/user/Page.vue'),
      meta: {
          layout: DefaultLayout
      }
  },
  { 
      path: '/user/create', 
      component: () => import('../views/user/Create.vue'),
      meta: {
          layout: DefaultLayout
      }
  },
  { 
      path: '/guidaoheng', 
      component: () => import('../views/guidaoheng/Page.vue'),
      meta: {
          layout: DefaultLayout
      }
  },
  { 
      path: '/qichecheng', 
      component: () => import('../views/qichecheng/Page.vue'),
      meta: {
          layout: DefaultLayout
      }
  },
  { 
      path: '/meicaiyang', 
      component: () => import('../views/meicaiyang/Page.vue'),
      meta: {
         layout: DefaultLayout
      }
  },
  { 
      path: '/pidaimeicaiyang', 
      component: () => import('../views/pidaimeicaiyang/Page.vue'),
      meta: {
         layout: DefaultLayout
      }
  },
  { 
      path: '/meizhi', 
      component: () => import('../views/meizhi/Page.vue'),
      meta: {
          layout: DefaultLayout
      }
  },
  { 
      path: '/huayandan', 
      component: () => import('../views/huayandan/Page.vue'),
      meta: {
          layout: DefaultLayout
      }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router