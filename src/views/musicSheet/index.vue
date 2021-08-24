<template>
  <div>
    <SheetTop :sheetData="state.playlist" />
    <div class="sheet-detail-box">
      <div class="vip-box" v-if="true">
        <CellItem
          title="领取成长值，升级可延长VIP天数"
          value="立即领取"
          icon="icon-huiyuan"
          iconColor="red"
        />
      </div>
      <div class="sheet-list-all">
        <CellItem
          :arrow="false"
          icon="icon-Controls-02"
          iconColor="red"
          iconSize="0.5rem"
        >
          <template #title>
            <div class="title-text">播放全部</div>
            <span class="sheet-num"
              >（{{ state.playlist ? state.playlist.trackCount : 0 }}）</span
            >
          </template>
          <template #right>
            <i class="iconfont icon-xiazai mh-download"></i>
            <i class="iconfont icon-n-check mh-select"></i>
          </template>
        </CellItem>
      </div>
      <div v-if="state.playlist">
        <CellItem
          :arrow="false"
          v-for="(item, index) in state.playlist ? state.playlist.tracks : []"
          :key="item.id"
          @click="playMusic(index)"
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
      <LoadingCom v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { getSongSheetDetail } from "@/api/songSheet";
import { useRoute } from "vue-router";
import { SheetReturnItem } from "./types";
import CellItem from "@/components/Cell/CellItem";
import LoadingCom from "@/components/Loading/LoadingCom";
import SheetTop from "./components/SheetTop.vue";
import store from "@/store";

export default defineComponent({
  name: "index",
  components: {
    SheetTop,
    LoadingCom,
    CellItem,
  },
  props: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      playlist: null as any,
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
    const playMusic = (mIndex: number) => {
      if (state.playlist) {
        store.commit("setPlayCurrntIndex", mIndex);
        store.commit("setPlayList", state.playlist.tracks);
      }
    };

    return {
      state,
      playMusic,
    };
  },
});
</script>

<style lang="scss" scoped>
.sheet-detail-box {
  background-color: #fff;
  margin: 0.3rem 0;
  .sheet-list-all {
    position: sticky;
    top: 1rem;
    background-color: #fff;
    z-index: 1;
  }
  .vip-box {
    margin: 0 0.3rem;
    border: 1px solid #d6d7d8;
    border-radius: 0.25rem;
  }
  .title-text {
    font-size: 0.42rem;
    font-weight: 600;
    margin-left: 0.2rem;
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
    font-size: 0.45rem;
    // margin-left: 0.08rem;
    text-align: center;
    width: 0.6rem;
  }
  .sheet-music-box {
    flex: 1;
    margin-left: 0.2rem;
    .sheet-music-name {
      font-size: 0.4rem;
      line-height: 0.5rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .sheet-music-author {
      font-size: 0.32rem;
      color: #909399;
      margin-top: 0.1rem;
      line-height: 0.35rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
