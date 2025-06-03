import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index.js";
// import store from "./store";
// import { whoAmI } from "./store/useLoginUser";
import provideStore from "./store/index_provide.js";


// vuex:
// createApp(App).use(router).use(store).mount("#app");
// store.dispatch("loginUser/whoAmI");//主动调用store中的aciton作用域中的whoAmI方法,同时不传递参数

// global_stat:
// createApp(App).use(router).mount('#app');
// whoAmI();

// provide-inject:

const app = createApp(App).use(router);
provideStore(app); // 提供所有共享数据
app.mount("#app");

