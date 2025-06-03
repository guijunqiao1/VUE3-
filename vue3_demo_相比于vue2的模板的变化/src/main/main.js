import { reactive, watchEffect, watch } from "vue";
const state = reactive({ //需要注意此处添加上的响应式变量不会在node执行到浏览器的时候带上浏览器，而是在node环境中存在的,
//若需要添加到浏览器的环境中则使用window.属性名 = 属性名 的形式完成在浏览器的该变量的访问许可
  count: 0,
});
watchEffect(() => {//该方法和watch区别在于，watchEffect监听的对象依赖于函数体中的内容,而watch方法直接指定了监听的对象；同时该方法在定义的时候立即执行
  console.log("watchEffect", state.count);
});

watch(
  () => state.count,
  (count, oldCount) => {
    console.log("watch", count, oldCount);
  }
);


// 此处和:
// watch(state,(oldVal,newVal)=>{})这种书写的形式之间的区别在于此处监听的是state变量的本身，只有在options参数位上设置了
//deep:true才能监听到变量的属性变化；而前者为直接监听具体属性的变化的字面量的书写的形式，但是正常来说直接书写字面量在编译过程
//中会直接被解析为常量，则需要使用立即执行函数包裹，则在监听器启动的时候执行函数得到具体监听的目标而不是将目标转化为常量


//同时监听多个值的写法
// watch([()=>state.a,x],([new1,new2],[old1,old2])=>{})

console.log("start");
setTimeout(() => {
  console.log("time out");
  state.count++;
  state.count++;
});
state.count++;
state.count++;

console.log("end");


// 输出结果为：
// watchEffect 0
// start
// end
// watchEffect 2
// watch 2 0
// time out
// watchEffect 4
// watch 4 2
// 其中的数字都是偶数的原因是：watch和watchEffect本质都是异步函数(除了watchEffect在定义的时候立即执行的时候是同步函数的情况),
//则只会在当前同步js任务队列中的所有内容执行完成之后才会进行总的变化分析以及异步监听回调的内容的加入

