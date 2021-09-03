<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- vue3.0配置 keep-alive缓存-->
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
    <PlayController />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import PlayController from "./components/PlayController/PlayController";

export default defineComponent({
  components: {
    PlayController,
  },
  setup() {
    return {};
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
