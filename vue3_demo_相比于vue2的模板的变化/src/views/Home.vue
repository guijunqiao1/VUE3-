<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="modalVisibleRef = true">打开朦层</button>
      </p>
      <Teleport to="body">
        <Modal v-if="modalVisibleRef">
          <button @click="modalVisibleRef = false">关闭朦层</button>
        </Modal>
      </Teleport>
      <!-- 补充：<Teleport> 是 Vue 3 中的一个内置组件，用于将模板中的一部分内容“传送”到 DOM 树中的另一个位置，而不改变组件的逻辑结构 -->
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big">
      <Block3 />
    </div>
    <div class="block big">
      <h2>区域4</h2>
    </div>
    <div class="block mid">
      <Block5 />
    </div>
    <div class="block">
      <h2>区域6</h2>
    </div>
  </div>
</template>

<!-- 需要注意的是生成的蒙层的元素和上述的内容整体互为兄弟元素，故不会触发当前组件内容中的控件中的冒泡事件，因为冒泡事件发生在祖先(或父亲)和子代之间,
没有血缘关系的标签发生阻挡是会屏蔽被遮住部分的事件触发的 -->

<script setup lang="js">
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { getAsyncComponent } from "../util/index.js";

const Block3 = getAsyncComponent("../components/Block3.vue");
const Block5 = getAsyncComponent("../components/Block5.vue");
const modalVisibleRef = ref(false);
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}

.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.mid {
  width: 300px;
}

.big {
  width: 400px;
}
</style>