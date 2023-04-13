import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'profile') next();

  if (to.query.id) {
    next()
  }
  else {
    let profile = JSON.parse(localStorage.getItem('profile'))
    to.query.id = profile.userId
    next();
  }
})


export default router;
