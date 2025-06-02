import { defineAsyncComponent, h } from "vue";
import Error from "../components/Error.vue";
import Loading from "../components/Loading.vue";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false,
});

// 补充：configure 方法用于设置 NProgress 进度条的全局配置选项。
// 配置中的两个选项：
// trickleSpeed: 50：
// 设置进度条自动递增（“trickle”）的速度，单位为毫秒（ms）。
// “Trickle” 是 NProgress 的一个特性，允许进度条在没有明确进度值时（例如 API 请求的等待时间未知）以随机小步长自动前进，模拟加载过程。
// trickleSpeed: 50 表示每 50 毫秒进度条会自动增加一小部分（默认是随机增量）。
// 较小的值（如 50ms）使进度条移动更频繁，显得更“活跃”；较大的值会使进度条移动更慢。
// showSpinner: false：
// 控制是否显示 NProgress 默认的加载旋转图标（spinner）。
// 设置为 false 表示禁用默认的旋转加载图标，只显示顶部进度条。
// 这通常用于更简洁的界面设计，或者当你想使用自定义的加载动画（比如你之前提到的 @keyframes loading-rotate 动画）时。


// 封装延迟函数
export function delay(duration) {
  if (!duration) {
    duration = random(1000, 5000);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// 封装获取随机数
export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 得到一个异步页面
export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();//进度条开始计时运动
      await delay();
      const comp = await import(path);
      NProgress.done();//执行到该语句的时候将进度条提前结束，后续直接返回组件内容
      return comp;//此处为异步页面的方法调用故在path方面指向的也是页面组件(页面名.vue)的地址，故import得到的同样是组件
    },
    loadingComponent: Loading, // 当promise在pending状态时，将显示这里的组件--内容为svg标签

    // 解释：
    // 1、loader：定义异步加载逻辑，启动 NProgress 进度条，模拟延迟（delay()），动态导入组件（import(path)），并在加载完成时结束进度条，返回组件定义。
    // 2、loadingComponent：在组件加载期间显示 Loading 组件，提供占位 UI，结合 NProgress 增强用户体验。
  });
}

// 得到一个异步组件
export function getAsyncComponent(path){
  return defineAsyncComponent({
    loader: async () => {//具体loading发生的事情
      await delay();
      if (Math.random() < 0.5) {
        //模拟加载故障
        throw new TypeError();
      }
      //等待成功完毕进行组件内容返回,而import函数得到组件的内容
      return import(path);
    },
    loadingComponent: Loading, // 当promise在pending状态时，将显示这里的组件,注意和loading配置项进行区分--具体loading过程呈现的组件内容
    errorComponent: {//该配置项控制返回加载过程中抛出失败的组件--即loader配置项的内容执行过程中
      //此处的render配合上了h函数达到了上述直接返回import函数得到的渲染结果相同的返回组件的效果
      render() {
        //也可以是返回一个
        return h(Error, "出错了！！！");
        //对h渲染函数进行补充，此处第二个参数进行了类型判断故为children参数位，同时由于第一个参数为组件标签，故渲染生成的内容
        //为该组件配合上当前的children嵌入其中的slot得到的最终计算DOM树结果
      },
    },

    // 解释：
    // 1、loader：定义异步加载逻辑，包含延迟（delay()）、错误模拟（TypeError）和动态导入（import(path)）。它控制组件如何加载，但当前 try-catch 阻止了错误触发。
    // 2、loadingComponent：在组件加载时显示 Loading 组件，提供用户友好的加载反馈。
    // 3、errorComponent：当加载失败时渲染自定义错误组件（显示“出错了！！！”），但需 loader 显式 reject 才会触发。
  });
};

// 补充:defineAsyncComponent 是 Vue 3 提供的一个 API，用于异步加载组件，实现延迟加载（lazy loading）。它允许你将组件的加载推迟到需要渲染时，从而优化应用性能，特别是在大型应用中减少初始加载时间