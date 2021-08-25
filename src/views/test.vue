<template>
  <div class="about">
    <Dialog
      :visible="dialogStatu"
      width="90%"
      top="5rem"
      title="请问一下"
      height="12rem"
      @close="closeDialog"
    >
      <h2>你是🐖🐖吗？？/</h2>
    </Dialog>

    <button @click="btnClick">显示按钮</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "../components/Dialog/Dialog";

export default defineComponent({
  components: {
    Dialog,
  },
  setup() {
    const dialogStatu = ref(false);
    const btnClick = () => {
      dialogStatu.value = true;
    };
    const closeDialog = () => {
      dialogStatu.value = false;
    };
    return {
      dialogStatu,
      btnClick,
      closeDialog,
    };
  },
});
</script>
