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

    <Popup
      :visible="dialogStatu1"
      @close="closeDialog('left')"
      direction="left"
      :style="{ width: '30%', height: '100%' }"
    />
    <Popup
      :visible="dialogStatu2"
      @close="closeDialog('bottom')"
      direction="bottom"
      :style="{ height: '30%' }"
    >
    </Popup>
    <Popup
      :visible="dialogStatu3"
      @close="closeDialog('top')"
      direction="top"
      :style="{ height: '30%' }"
    />
    <!-- <Popup
      :visible="dialogStatu4"
      @close="closeDialog('right')"
      direction="right"
      :style="{ width: '30%', height: '100%' }"
    /> -->
    <!-- <Popup
      :visible="dialogStatu4"
      @close="closeDialog('right')"
      direction="center"
      :style="{ padding: '30px 50px' }"
    /> -->
    <MConfirm v-model="dialogStatu3" />

    <button @click="btnClick">dialog的哦</button>
    <button @click="btnClick('left')">左边出来</button>
    <button @click="btnClick('bottom')">底部出来</button>
    <button @click="btnClick('top')">顶部出来</button>
    <button @click="btnClick('top')">右边出来</button>

    <br />

    <button @click="showConfirm">点击调用</button>
    <button @click="btnClick('right')">测试toast</button>

    <br />
    <button @click="showToast">点击Toast</button>

    <MToast
      v-model="dialogStatu4"
      icon="icon-xihuan"
      position="top"
      message="手机号应该是11位数"
      type="loading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "../components/Dialog/Dialog";
import Popup from "../components/Popup/Popup";
// import MConfirm from "../components/Confirm/Confirm";
import Toast from "@/components/Toast";

const MToast = Toast.Component;

import { Confirm } from "@/components/Confirm";
const MConfirm = Confirm.Component;

export default defineComponent({
  components: {
    Dialog,
    Popup,
    MConfirm,
    MToast,
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
          console.log("开始", dialogStatu4.value);
          dialogStatu4.value = true;
          console.log("结束", dialogStatu4.value);
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

    const showConfirm = () => {
      Confirm({
        title: "dadsa",
        message: "dddd",
        cancelButtonText: "我走了嗷",
        confirmButtonText: "我来了嗷",
        showCancelButton: false,
      })
        .then((res) => {
          console.log("点击了确定");
        })
        .catch(() => {
          console.log("点击了取消");
        });
    };

    const showToast = () => {
      Toast.fail({
        message: "加载中...",
        duration: 5000,
      });
    };

    return {
      dialogStatu,
      dialogStatu1,
      dialogStatu2,
      dialogStatu3,
      dialogStatu4,
      btnClick,
      closeDialog,
      showConfirm,
      showToast,
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
