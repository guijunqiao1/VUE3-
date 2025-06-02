<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <div class="checkbox" :class="{ checked: modelValue }" @click="handleChecked"></div>
      <input type="text" class="editor" :value="title" @input="handleTextChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Boolean,
    //此处接收到的值对应上v-model
    title: String,
    //此处对应上v-model:title
    titleModifiers: {
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const handleChecked = () => {
      ctx.emit("update:modelValue", !props.modelValue);
      // 作用：触发 update:modelValue 事件，将 modelValue 的值取反。
      // 解析：
      // ctx.emit：上下文提供的 emit 方法，用于触发自定义事件。
      // "update:modelValue"：事件名，符合 v-model 的约定，通知父组件更新 modelValue。
      // !props.modelValue：将当前 modelValue（布尔值）取反，切换复选框的选中状态。
    };

    const handleTextChange = (e) => {
      let value = e.target.value;
      if (props.titleModifiers.trim) {
        value = value.trim();
      }
      ctx.emit("update:title", value);
      // 作用：触发 update:title 事件，将处理后的输入值传递给父组件。
      // 解析：
      // "update:title"：事件名，符合 v - model:title 的约定，通知父组件更新 title。
      // value：处理后的输入值（可能经过 trim）。
    };
    return {
      handleChecked,
      handleTextChange,
    };
  },
};
</script>

<style scoped>
.check-editor {
  cursor: pointer;
}

.check-editor-inner {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 3px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox:hover,
.checkbox.checked {
  border-color: #409eff;
}

.checkbox.checked::after {
  content: "";
  border-radius: 2px;
  width: 9px;
  height: 9px;
  background: #409eff;
}

.editor {
  border: none;
  outline: none;
  margin-left: 5px;
  border-bottom: 1px solid #dcdfe6;
  font-size: inherit;
}
</style>