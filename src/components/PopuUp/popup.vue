<template>
  <div>
    <!-- 遮罩层动画 -->
    <div
      class="mask"
      @click="hideOnBlur"
      :style="`display: ${visible ? '' : 'none'} `"
    ></div>
    <!-- <input style="display:none" v-model="visible" /> -->
    <!-- 显示信息层 -->
    <transition name="pop-slide-bottom">
      <div class="popup-box" v-show="visible">
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
        <h2>上海覅</h2>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    direction: {
      validator: (value: string) => {
        return ["bottom", "left", "right", "top"].includes(value);
      },
      default: "",
    },
    height: {
      type: String,
      default: "30%",
    },
    width: {
      type: String,
      default: "30%",
    },
    //禁止页面滚动
    scroll: {
      type: Boolean,
      default: true,
    },
    //弹窗动画
    dialogTransition: {
      type: String,
      default: "fade",
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    //     onMounted(()=>{
    // if (typeof props.visible !== "undefined") {
    //       this.currentValue = this.value;
    //     }
    //     })
    const currentValue = ref(false);
    // watch: {
    //   value(val) {
    //     currentValue.val = val;
    //   }

    // }
    // watch(props, (newValue) => {
    //   console.log(newValue.visible);
    //   currentValue.value = newValue.visible;
    // });
    const hideOnBlur = () => {
      currentValue.value = false;
      emit("close");
    };
    return {
      currentValue,
      hideOnBlur,
    };
  },
});
</script>

<style lang="scss">
@import "./index.scss";
/*遮罩层*/
// .mask {
//   position: fixed;
//   z-index: 101;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
// }

// .popup-box {
//   position: fixed;
//   bottom: 0px;
//   left: 0px;
//   max-width: 100%;
//   max-height: 100%;
//   min-width: 100%;
//   min-height: 50px;
//   background: #fff;
//   z-index: 200;
//   transform: translateY(0%);
//   font-size: 0.3rem;
// }

// .fade-enter-active {
//   transition: all 0.3s ease;
// }
// .fade-leave-active {
//   transition: all 0.3s ease;
// }
// .fade-enter-from,
// .fade-leave-to {
//   transform: translateY(100%);
//   opacity: 0;
// }
// .pop-slide-top-enter-active,
// .pop-slide-left-enter-active,
// .pop-slide-right-enter-active,
// .pop-slide-bottom-enter-active {
//   transition: all 0.3s ease;
// }

// .pop-slide-top-leave-active,
// .pop-slide-left-leave-active,
// .pop-slide-right-leave-active,
// .pop-slide-bottom-leave-active {
//   transition: all 0.3s ease;
// }
// .pop-slide-top-enter-from,
// .pop-slide-top-leave-active {
//   transform: translate3d(0, -100%, 0);
// }

// .pop-slide-right-enter-from,
// .pop-slide-right-leave-active {
//   transform: translate3d(100%, -50%, 0);
// }

// .pop-slide-bottom-enter-from,
// .pop-slide-bottom-leave-active {
//   transform: translate3d(0, 100%, 0);
// }

// .pop-slide-left-enter-from,
// .pop-slide-left-leave-active {
//   transform: translate3d(-100%, -50%, 0);
// }
</style>
