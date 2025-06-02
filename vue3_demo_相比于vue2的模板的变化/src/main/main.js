import { reactive, watchEffect, watch } from "vue";
const state = reactive({ //需要注意此处添加上的响应式变量不会在node执行到浏览器的时候带上浏览器，而是在node环境中存在的,
//若需要添加到浏览器的环境中则使用window.属性名 = 属性名 的形式完成在浏览器的该变量的访问许可
  count: 0,
});
watchEffect(() => {
  console.log("watchEffect", state.count);
});
watch(
  () => state.count,
  (count, oldCount) => {
    console.log("watch", count, oldCount);
  }
);
console.log("start");
setTimeout(() => {
  console.log("time out");
  state.count++;
  state.count++;
});
state.count++;
state.count++;

console.log("end");
  
// 拓展：
//（1）
// import {reactive} from "vue";
// const state = reactive({a:1,b:2});//已知reactive方法的返回值为proxy
// window.state = state;
// const state1 = readonly(state);
// window.state1 = state1;
// console.log("取等?"+ (state === state1))//false，因为代理不一致
//（2）
// import {reactive,computed} from "vue";
// const state = reactive({a:1,b:2});
// const sum = computed(()=>{//计算属性函数返回值为{value:计算内容}对象
//   console.log("当前执行了一次计算函数");
//   return state.a + state.b;
// })
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
//上述输出为：当前执行了一次计算函数,3,3,3
// state.a = 2;
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// console.log(sum.value);
// 上述输出为：当前执行了一次计算函数,4,4,4

// 反映了computed函数只会在应用的内容(包括变量的监听)发生了改变的时候重新执行，否则使用缓存s