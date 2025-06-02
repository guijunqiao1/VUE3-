// 异步加载页面函数的引入,该函数本质上返回的是组件同时路由进行内容切换的时候也是将页面作为一个组件看待,最终防止在router-view中
import { getAsyncPage } from "../util";

const Home = getAsyncPage("../views/Home.vue");
const About = getAsyncPage("../views/About.vue");

export default [
  { path: "/", component: Home },
  { path: "/about", component: About },
];