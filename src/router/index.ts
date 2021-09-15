import store from "@/store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/index.vue"),
    meta: {
      keepAlive: true, //是否需要缓存
      title: "梦回云音乐-首页",
    },
  },
  {
    path: "/sheetList",
    name: "sheetList",
    component: () => import("../views/musicSheet/index.vue"),
    meta: {
      title: "梦回云音乐-歌单",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search/index"),
    meta: {
      title: "梦回云音乐-搜索",
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/user/index"),
    meta: {
      title: "梦回云音乐-个人中心",
    },
    beforeEnter: (to, from, next) => {
      console.log(store.state.userInfo);
      if (store.state.userInfo.isLogin) {
        next();
      } else {
        next("login");
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/user/login/index"),
    meta: {
      title: "梦回云音乐-登录中心",
    },
    beforeEnter: (to, from, next) => {
      if (store.state.userInfo.isLogin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
    meta: {
      title: "梦回云音乐-测试",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title + "";
  }
  next();
});

export default router;
