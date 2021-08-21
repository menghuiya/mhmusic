import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/index.vue"),
  },
  {
    path: "/sheetList",
    name: "sheetList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/musicSheet/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
