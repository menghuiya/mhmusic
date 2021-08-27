<template>
  <div class="about">
    <Dialog
      width="90%"
      top="10vh"
      title="请问一下"
      height="12rem"
      :visible="dialogStatu"
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
      :style="{ width: '30%', height: '100%' }"
    />
    <PopuUp
      :visible="dialogStatu2"
      @close="closeDialog('bottom')"
      direction="bottom"
      :style="{ height: '30%' }"
    />
    <PopuUp
      :visible="dialogStatu3"
      @close="closeDialog('top')"
      direction="top"
      :style="{ height: '30%' }"
    />
    <!-- <PopuUp
      :visible="dialogStatu4"
      @close="closeDialog('right')"
      direction="right"
      :style="{ width: '30%', height: '100%' }"
    /> -->
    <PopuUp
      :visible="dialogStatu4"
      @close="closeDialog('right')"
      direction="center"
      :style="{ padding: '30px 50px' }"
    />

    <button @click="btnClick">dialog的哦</button>
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
    const dialogStatu = ref(false);
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
        default:
          dialogStatu.value = true;
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
        default:
          dialogStatu.value = false;
      }
    };
    return {
      dialogStatu,
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
