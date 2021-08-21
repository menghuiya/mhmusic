<template>
  <div>
    <Nav leftIcon="icon-liebiao" rightIcon="icon-sousuo">
      <template #center>
        <span>歌单®</span>
      </template>
      <template #right>
        <i class="iconfont icon-sousuo search"></i>
        <i class="iconfont icon-gengduo"></i>
      </template>
    </Nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getSongSheetDetail } from "@/api/songSheet";
import { useRoute } from "vue-router";
import { SheetReturnItem } from "./types";

import Nav from "@/components/Nav/Nav";

export default defineComponent({
  name: "index",
  components: {
    Nav,
  },
  props: {},
  setup() {
    const route = useRoute();
    onMounted(() => {
      getSongSheetDetail(Number(route.query.id)).then(
        (res: SheetReturnItem) => {
          console.log(res.playlist);
          console.log(res.privileges);
        }
      );
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
.search {
  margin-right: 0.5rem;
}
</style>
