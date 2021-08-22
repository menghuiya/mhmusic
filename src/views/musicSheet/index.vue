<template>
  <div v-if="state.playlist">
    <SheetTop :sheetData="state.playlist" />
    <div class="sheet-detail-box">
      <div class="vip-box" v-if="false">
        <CellItem
          title="领取成长值，升级可延长VIP天数"
          value="立即领取"
          icon="icon-huiyuan"
          iconColor="red"
        />
      </div>
      <CellItem
        :arrow="false"
        icon="icon-Controls-02"
        iconColor="red"
        iconSize="0.6rem"
      >
        <template #title>
          <div class="title-text">播放全部</div>
          <span class="sheet-num">（112）</span>
        </template>
        <template #right>
          <i class="iconfont icon-xiazai mh-download"></i>
          <i class="iconfont icon-n-check mh-select"></i>
        </template>
      </CellItem>
      <CellItem
        :arrow="false"
        v-for="(item, index) in state.playlist.tracks"
        :key="item.id"
      >
        <template #icon>
          <div class="list-index">{{ index + 1 }}</div>
        </template>
        <template #title>
          <div class="sheet-music-box">
            <div class="sheet-music-name">{{ item.name }}</div>
            <div class="sheet-music-author">
              {{ item.ar[0].name }}-{{ item.al.name }}
            </div>
          </div>
        </template>
        <template #right>
          <i class="iconfont icon-bofangqi mh-play-video"></i>
          <i class="iconfont icon-gengduo mh-more"></i>
        </template>
      </CellItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { getSongSheetDetail } from "@/api/songSheet";
import { useRoute } from "vue-router";
import { SheetReturnItem } from "./types";
import CellItem from "@/components/Cell/CellItem";
import SheetTop from "./components/SheetTop.vue";

export default defineComponent({
  name: "index",
  components: {
    SheetTop,
    CellItem,
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

<style lang="scss" scoped>
.sheet-detail-box {
  background-color: #fff;
  margin: 0.3rem 0;
  .vip-box {
    margin: 0 0.3rem;
    border: 1px solid #d6d7d8;
    border-radius: 0.25rem;
  }
  .title-text {
    font-size: 0.42rem;
    font-weight: 600;
    margin-left: 0.1rem;
  }
  .sheet-num {
    font-size: 0.25rem;
    font-weight: 600;
    color: #909399;
  }
  .mh-download {
    margin-right: 0.4rem;
    font-size: 0.6rem !important;
    color: #000;
    font-weight: 600;
  }
  .mh-select {
    color: #000;
    font-size: 0.6rem !important;
    font-weight: 600;
  }
  .list-index {
    color: #909399;
    font-size: 0.5rem;
    margin-left: 0.08rem;
  }
  .sheet-music-box {
    margin-left: 0.3rem;
    .sheet-music-name {
      font-size: 0.4rem;
    }
    .sheet-music-author {
      font-size: 0.32rem;
      color: #909399;
      margin-top: 0.1rem;
    }
  }
  .mh-play-video {
    margin-right: 0.45rem;
    font-size: 0.5rem !important;
  }
  .mh-more {
    font-size: 0.45rem !important;
    margin-right: 0.1rem;
  }
}
</style>
