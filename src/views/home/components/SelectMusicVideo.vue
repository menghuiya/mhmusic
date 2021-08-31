<template>
  <TitleLine
    showType="left"
    title="精选音乐视频"
    icon="icon-shuaxin1"
    btnName="换一批"
  />
  <div class="song-video-box">
    <swiper :slides-per-view="'auto'" :space-between="8">
      <swiper-slide
        v-for="item in recomdmMvData"
        :key="item.id"
        @click="handleClick(item)"
      >
        <SongVideoCard :mvData="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import TitleLine from "@/components/TitleLine/TitleLine";
import SongVideoCard from "@/components/SongVideoCard/SongVideoCard";
import { getRecomdVideos } from "@/api/home";
import { RecomdMvItem, RecomdOptions } from "./types";

export default defineComponent({
  name: "SelectMusicVideo",
  components: {
    TitleLine,
    SongVideoCard,
  },
  props: {},
  setup(props, { emit }) {
    const recomdmMvData = ref<RecomdMvItem[]>([]);
    onMounted(() => {
      getRecomdVideos(7).then((res: RecomdOptions) => {
        recomdmMvData.value = res.result;
      });
    });
    const handleClick = (sheetData: RecomdMvItem) => {
      console.log(sheetData);
      emit("item-click", sheetData);
    };
    return {
      recomdmMvData,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.song-video-box {
  padding: 0 0.25rem;
  .swiper-slide {
    height: 4.5rem;
    width: 2.8rem;
    font-size: 0.14rem;
    overflow: hidden;
  }
}
</style>
