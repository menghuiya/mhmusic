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
import { defineComponent, onMounted, provide, ref } from "vue";
import PlayController from "./components/PlayController/PlayController";

import { PlayBoxState } from "@/utils/types";
import { disabledScale } from "@/plugins/disablescal";
export default defineComponent({
  components: {
    PlayController,
  },
  setup() {
    onMounted(() => {
      disabledScale();
    });
    const boxStatus = ref(true);
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
    return {
      boxStatus,
    };
  },
});
</script>

<style lang="scss">
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
