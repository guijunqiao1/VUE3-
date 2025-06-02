<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<style scoped>
/* 通过此处的样式使得modal标签处于蒙层 */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
}
</style>