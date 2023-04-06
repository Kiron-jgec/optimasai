import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
  {
    path: "/data",
    name: "data",
    component: function () {
      return import(/* webpackChunkName: "counter" */ "../views/DataView.vue");
    },
  },
  {
    path: "/update/:id",
    name: "update",
    component: function () {
      return import(
        /* webpackChunkName: "counter" */ "../views/UpdateData.vue"
      );
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
