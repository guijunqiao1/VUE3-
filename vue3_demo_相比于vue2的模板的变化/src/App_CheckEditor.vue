<template>
  <div class="container">
    <div class="list">
      <strong>编辑:</strong>
      <div class="list">
        <CheckEditor v-for="item in productsRef" :key="item.id" v-model="item.sell" v-model:title="item.title" />
        <!-- 上述v-model为双向绑定传递多个值的写法 -->
      </div>
    </div>
    <div class="list">
      <strong>销售中:</strong>
      <div>
        <template v-for="(item, index) in sellsRef" :key="item.id">
          <span>{{ index + 1 }}.</span>
          <strong>{{ item.title }}</strong>
        </template>
      </div>
    </div>
  </div>

  <div>
    <div v-if="isAccountRef">
      <label>账号：</label>
      <input type="text" />
    </div>
    <div v-else>
      <label>手机号：</label>
      <input type="text" />
    </div>
    <button @click="isAccountRef = !isAccountRef">切换登录方式</button>
  </div>
</template>

<script setup lang="js">
import CheckEditor from "./components/CheckEditor.vue";
import { ref, computed } from "vue";
const defaultSells = [
  {
    id: 1,
    sell: true,
    title: "iphone12",
  },
  { id: 2, sell: false, title: "xiaomi" },
  { id: 3, sell: true, title: "huawei" },
  { id: 4, sell: true, title: "vivo" },
];

const productsRef = ref(defaultSells);
const sellsRef = computed(() => productsRef.value.filter((it) => it.sell));
const isAccountRef = ref(false);
</script>

<style scoped>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}

.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}

strong {
  margin-right: 1em;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>