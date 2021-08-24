<template>
  <TitleLine />
  <div class="find-music-box">
    <swiper
      :slides-per-view="'auto'"
      :space-between="8"
      v-if="findSheetData.length"
    >
      <swiper-slide
        v-for="item in findSheetData"
        :key="item.id"
        @click="handleClick(item)"
      >
        <SongSheetCard :sheetData="item" />
      </swiper-slide>
    </swiper>

    <LoadingCom v-else />
  </div>
</template>

<script lang="ts">
import { getRecomdSheet } from "@/api/home";
import { defineComponent, onMounted, ref } from "vue";
import { RecomdOptions, RecomdSheetItem } from "./types";
import TitleLine from "@/components/TitleLine/TitleLine";
import LoadingCom from "@/components/Loading/LoadingCom";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import router from "@/router";

export default defineComponent({
  name: "FindMusiList",
  components: {
    TitleLine,
    SongSheetCard,
    LoadingCom,
  },
  props: {},
  // emits: ["item-click"],
  setup() {
    const findSheetData = ref<RecomdSheetItem[]>([]);
    onMounted(() => {
      getRecomdSheet(10).then((res: RecomdOptions) => {
        findSheetData.value = res.result;
      });
    });
    const handleClick = (sheetData: RecomdSheetItem) => {
      console.log(sheetData);
      router.push({
        path: "/sheetList",
        query: {
          id: sheetData.id,
        },
      });
    };
    return {
      findSheetData,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.find-music-box {
  padding: 0 0.25rem;
  .swiper-slide {
    height: 3.8rem;
    width: 2.8rem;
    font-size: 0.14rem;
    overflow: hidden;
  }
}
</style>
