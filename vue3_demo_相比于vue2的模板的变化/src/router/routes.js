// 异步加载页面函数的引入,该函数本质上返回的是组件同时路由进行内容切换的时候也是将页面作为一个组件看待,最终防止在router-view中
import { getAsyncPage } from "../util";

const Home = getAsyncPage("../views/Home.vue");
const About = getAsyncPage("../views/About.vue");
import Login from "../views/Login_vuex.vue";
import Home_vuex from "../views/Home_vuex.vue";
import Login_global_state from "../views/Login_global_state.vue";
import Home_global_state from "../views/Home_global_state.vue";
import Home_provide from "../views/Home_provide.vue";
import Login_provide from "../views/Login_provide.vue";


export default [
  { path: "/", component: Home },
  { path: "/Home_vuex", component: Home_vuex },
  { path: "/Home_provide", component: Home_provide },
  { path: "/Home_global_state", component: Home_global_state },
  { path: "/about", component: About },
  { path: "/login_global_state", component: Login_global_state },
  { path: "/login", component: Login },
  { path: "/login_provide", component: Login_provide }
];