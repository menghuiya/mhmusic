<template>
  <!-- <div> -->
  <router-view v-slot="{ Component }">
    <!-- vue3.0配置 keep-alive缓存-->
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
  <PlayController v-model="boxStatus" />
  <!-- </div> -->
</template>
<script lang="tsx">
import { computed, defineComponent, onMounted, provide, ref } from "vue";
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
</style>
