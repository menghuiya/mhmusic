<template>
  <div>
    <SheetTop :sheetData="state.playlist" v-if="state.playlist" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { getSongSheetDetail } from "@/api/songSheet";
import { useRoute } from "vue-router";
import { SheetReturnItem } from "./types";

import SheetTop from "./components/SheetTop.vue";

export default defineComponent({
  name: "index",
  components: {
    SheetTop,
  },
  props: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      playlist: null,
      privileges: [],
    });
    onMounted(() => {
      getSongSheetDetail(Number(route.query.id)).then(
        (res: SheetReturnItem) => {
          state.playlist = res.playlist;
          state.privileges = res.privileges;
        }
      );
    });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped></style>
