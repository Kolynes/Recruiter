import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "",
  routes: [
    {path: "/", component: () => import("@/views/home/Home.vue")},
    {path: "/dashboard", redirect: "/dashboard/home", component: () => import("@/views/dashboard/Dashboard.vue"), children: [
      {path: "/dashboard/home", component: () => import("@/views/dashboard/home/Home.vue")},
      {path: "/dashboard/applications", component: () => import("@/views/applications/Applications.vue")},
      {path: "/dashboard/profile", component: () => import("@/views/profile/Profile.vue")},
      {path: "/dashboard/accounts", component: () => import("@/views/admin/accounts/Accounts.vue")},
      {path: "/dashboard/tests", component: () => import("@/views/tests/Tests.vue")},
      {path: "/dashboard/jobs", component: () => import("@/views/jobs/Jobs.vue")}
    ]},
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})
