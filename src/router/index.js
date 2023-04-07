import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  // home page
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // data page
  {
    path: "/data",
    name: "data",
    component: function () {
      return import(/* webpackChunkName: "data" */ "../views/DataView.vue");
    },
  },
  // about page
  {
    path: "/about",
    name: "about",
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
  // update data page
  {
    path: "/update/:id",
    name: "update",
    component: function () {
      return import(/* webpackChunkName: "update" */ "../views/UpdateData.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
