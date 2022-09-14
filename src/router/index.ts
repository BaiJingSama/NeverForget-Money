import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";
// import { component } from "vue/types/umd";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditLabel.vue";
import CreateTags from "@/views/CreateTags.vue";
import Charts from "@/views/Charts.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/money",
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/labels",
    component: Labels,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/createtags",
    component: CreateTags,
  },
  {
    path: "/labels/edit/:id",
    component: EditLabel,
  },
  {
    path: "*",
    component: NotFound,
  },
  // 因为路径是从上往下匹配，把定义了的路径匹配完，剩下所有路径自然就是404
];

const router = new VueRouter({
  routes,
});

export default router;
