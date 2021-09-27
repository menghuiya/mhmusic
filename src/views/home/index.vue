<template>
  <div class="home">
    <Nav
      leftIcon="icon-liebiao"
      rightIcon="icon-sousuo"
      @leftClick="handLeftClick"
      @rightClick="handRightClick"
      style="background:#fff"
    >
      <template #center>
        <div
          :class="`nav-title ${selectId === item.id ? 'active' : ''}`"
          @click="handleChange(item.id)"
          v-for="(item, index) in navData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </template>
    </Nav>
    <HomeBanner />
    <MenuList />
    <FindMusiList />
    <SelectMusicVideo />
    <SearchPage :visible="showSearch" @close="showSearch = false" />
    <HomeInfo :visible="showInfo" @close="showInfo = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref, watch } from "vue";
import Nav from "@/components/Nav/Nav";
import HomeBanner from "./components/HomeBanner";
import SearchPage from "./components/SearchPage";
import HomeInfo from "./components/HomeInfo";

import MenuList from "./components/MenuList.vue";
import FindMusiList from "./components/FindMusiList.vue";
import SelectMusicVideo from "./components/SelectMusicVideo.vue";
import { PlayBoxState } from "@/utils/types";

export default defineComponent({
  name: "Home",
  components: {
    Nav,
    HomeBanner,
    MenuList,
    FindMusiList,
    SelectMusicVideo,
    SearchPage,
    HomeInfo,
  },
  setup() {
    const selectId = ref(1);
    const showSearch = ref(false);
    const showInfo = ref(false);
    const navData = reactive([
      { id: 1, name: "我的" },
      { id: 2, name: "发现" },
      { id: 3, name: "云村" },
      { id: 4, name: "视频" },
    ]);
    const playBox = inject<PlayBoxState>("PlayBoxKey");
    const handLeftClick = () => {
      showInfo.value = true;
    };
    onMounted(() => {
      // handLeftClick();
    });
    const handRightClick = () => {
      showSearch.value = true;
    };
    const handleChange = (num: number) => {
      selectId.value = num;
    };

    // watch(
    //   () => showInfo.value,
    //   (newValue) => {
    //     if (newValue) {
    //       playBox?.close();
    //     } else {
    //       playBox?.open();
    //     }
    //   }
    // );

    return {
      handLeftClick,
      handRightClick,
      handleChange,
      selectId,
      navData,
      showSearch,
      showInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.home {
  @include cell_bgcolor("background_color");
  @include font_color("text-color");
}
</style>
