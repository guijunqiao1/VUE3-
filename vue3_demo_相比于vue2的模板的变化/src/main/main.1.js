import { reactive, readonly, ref, computed } from "vue";

const state = reactive({
  firstName: "Xu Ming",
  lastName: "Deng",
});
const fullName = computed(() => {
  console.log("changed");
  return `${state.lastName}, ${state.firstName}`;
});
console.log("state ready");
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value);
const imState = readonly(state);
console.log(imState === state);

const stateRef = ref(state);
console.log(stateRef.value === state);

state.firstName = "Cheng";
state.lastName = "Ji";

console.log(imState.firstName, imState.lastName);
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value);

const imState2 = readonly(stateRef);
console.log(imState2.value === stateRef.value);

//输出结果分别是：
// state ready 
// changed 
// fullname is Deng,Xu Ming 
// fullname is Deng,Xu Ming 
// false 
// true 
// Cheng,Ji
// changed 
// fullname is Ji,Cheng
// fullname is Ji,Cheng
// false --此处因为proxy代理为深度代理



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

// 反映了computed函数只会在应用的内容(包括变量的监听)发生了改变的时候重新执行，否则使用缓存