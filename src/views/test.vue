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

    <PopuUp
      :visible="dialogStatu1"
      @close="closeDialog('left')"
      direction="left"
    />
    <PopuUp
      :visible="dialogStatu2"
      @close="closeDialog('bottom')"
      direction="bottom"
    />
    <PopuUp
      :visible="dialogStatu3"
      @close="closeDialog('top')"
      direction="top"
    />
    <PopuUp
      :visible="dialogStatu4"
      @close="closeDialog('right')"
      direction="right"
    />

    <button @click="btnClick('left')">左边出来</button>
    <button @click="btnClick('bottom')">底部出来</button>
    <button @click="btnClick('top')">顶部出来</button>
    <button @click="btnClick('right')">右边出来</button>
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
    const dialogStatu1 = ref(false);
    const dialogStatu2 = ref(false);
    const dialogStatu3 = ref(false);
    const dialogStatu4 = ref(false);
    const btnClick = (dict: string) => {
      switch (dict) {
        case "left":
          dialogStatu1.value = true;
          break;
        case "bottom":
          dialogStatu2.value = true;
          break;
        case "top":
          dialogStatu3.value = true;
          break;
        case "right":
          dialogStatu4.value = true;
          break;
      }
    };
    const closeDialog = (dict: string) => {
      switch (dict) {
        case "left":
          dialogStatu1.value = false;
          break;
        case "bottom":
          dialogStatu2.value = false;
          break;
        case "top":
          dialogStatu3.value = false;
          break;
        case "right":
          dialogStatu4.value = false;
          break;
      }
    };
    return {
      dialogStatu1,
      dialogStatu2,
      dialogStatu3,
      dialogStatu4,
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
