import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/home/index.vue"),
  },
  {
    path: "/sheetList",
    name: "sheetList",
    component: () =>
      import("../views/musicSheet/index.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
