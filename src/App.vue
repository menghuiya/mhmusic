<template>
  <div>
    <router-view />
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

a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
</style>
