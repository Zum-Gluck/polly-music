import HomeView from "@/views/home/Home.vue";
import ErrorPage from "@/views/error/ErrorPage.vue";
import Layout from "@/views/layout/Layout.vue";

// 登陆路由
const __login__ = {
  path: "/login",
  name: "login",
  meta: {},
  component: () => import("@/views/login/Login.vue"),
};

// 主路由配置
const appRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/rank",
        name: "rank",
        meta: {
          keepAlive: true,
        },
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/rank/Rank.vue"),
      },
      {
        path: "/songlist",
        name: "song-list",
        meta: {},
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/songlist/SongList.vue"),
      },
      {
        path: "/singer",
        name: "singer",
        meta: {},
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/singer/Singer.vue"),
      },
      {
        path: "/videopage",
        name: "video-page",
        meta: {},
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/videopage/VideoPage.vue"),
      },
      {
        path: "/mv",
        name: "mv",
        meta: {},
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/mv/Mv.vue"),
      },
      {
        path: "/profile/:id",
        name: "profile",
        meta: {
          keepAlive: true,
        },
        //路由懒加载的写法 import() 与 import 不同
        component: () => import("@/views/profile/profile.vue"),
      },
      {
        path: "/songmenu/:id",
        name: "song-menu",
        component: () => import("@/views/songmenu/SongMenu.vue"),
      },
      {
        path: "/vdetail/:id",
        name: "video-detail",
        component: () => import("@/views/videodetail/Vdetail.vue"),
      },
    ],
  },
];

// 错误页面处理
const __errorPage__ = {
  path: "*",
  name: "error-page",
  component: ErrorPage,
};

export const routes = [...appRoutes, __login__, __errorPage__];
