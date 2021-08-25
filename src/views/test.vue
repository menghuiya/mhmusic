<template>
  <div class="about">
    <Dialog
      width="90%"
      top="10vh"
      title="请问一下"
      height="12rem"
      @close="closeDialog"
    >
      <div class="test">
        <h2 v-for="i in 15" :key="i">你是🐖🐖吗{{ i }}？？/</h2>
      </div>
    </Dialog>

    <PopuUp :visible="dialogStatu" @close="closeDialog" direction="left" />

    <button @click="btnClick">显示按钮</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "../components/Dialog/Dialog";
import PopuUp from "../components/PopuUp/PopuUp";

export default defineComponent({
  components: {
    Dialog,
    PopuUp,
  },
  setup() {
    const dialogStatu = ref(false);
    const btnClick = () => {
      dialogStatu.value = true;
    };
    const closeDialog = () => {
      console.log("触发了吗2");

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

<style lang="scss" scoped>
.test {
  // height: 10rem;
  // overflow: auto;
}
</style>
