<template>
  <!-- <div> -->
  <div class="app-content">
    <router-view v-slot="{ Component }">
      <!-- vue3.0配置 keep-alive缓存-->
      <transition :name="$route.meta.transitionName">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
      </transition>
      <transition :name="$route.meta.transitionName">
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </transition>
    </router-view>
  </div>
  <PlayController v-model="boxStatus" />
  <!-- </div> -->
</template>
<script lang="tsx">
import {
  computed,
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import PlayController from "./components/PlayController/PlayController";

import {
  DarkControllerKey,
  DarkControllerState,
  PlayBoxState,
} from "@/utils/types";
import { disabledScale } from "@/plugins/disablescal";
import store from "./store";
export default defineComponent({
  components: {
    PlayController,
  },
  watch: {
    $route(to, from) {
      //禁止刷新当前页时 触发动画效果
      if (from.meta.index === undefined) {
        to.meta.transitionName = "";
        return;
      }
      if (to.meta.index > from.meta.index) {
        to.meta.transitionName = "jump";
      } else {
        to.meta.transitionName = "back";
      }
    },
  },
  setup() {
    onMounted(() => {
      disabledScale();
    });
    const boxStatus = ref(true);
    const dark = computed(() => store.state.dark);
    const close = () => {
      boxStatus.value = false;
    };
    const open = () => {
      boxStatus.value = true;
    };
    provide<PlayBoxState>("PlayBoxKey", {
      close,
      open,
    });

    const modelBrn = (value: boolean) => {
      store.commit("changeDark", value);
      if (dark.value) {
        window.document.documentElement.setAttribute("data-theme", "dark");
      } else {
        window.document.documentElement.setAttribute("data-theme", "light");
      }
    };

    onMounted(() => {
      window.document.documentElement.setAttribute(
        "data-theme",
        dark.value ? "dark" : "light"
      );
    });
    provide<DarkControllerState>(DarkControllerKey, {
      modelBrn,
    });

    return {
      boxStatus,
      modelBrn,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
html,
body,
#app {
  height: 100%;
  // background: #f5f5f5;
  @include background_color("background_color");
  @include font_color("text-color");

  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  .app-content {
    flex: 1;
    overflow: auto;
    // -webkit-overflow-scrolling: touch;
  }
}
a,
img,
input {
  border: none;
}

input,
textarea {
  user-select: text !important;
}

a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}

// .jump-enter-active {
//   transform: translate(100%, 0);
// }
// .jump-enter-to {
//   transform: translate(0, 0);
// }

// .back-leave-active {
//   z-index: 5;
//   transform: translate(0, 0);
// }
// .back-leave-to {
//   transform: translate(100%, 0);
// }
.back-enter-active,
.back-leave-active,
.jump-enter-active,
.jump-leave-active {
  will-change: transform;
  transition: all 0.3s;
  width: 100%;
  position: absolute;
  z-index: 99;
}
.jump-enter-from {
  // opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.jump-leave-active {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.back-enter-from {
  // opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.back-leave-active {
  // opacity: 0;
  transform: translate3d(+100%, 0, 0);
}

.app-view {
  // transition: transform 0.5s;
}
</style>
