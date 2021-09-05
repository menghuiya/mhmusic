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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Nav from "@/components/Nav/Nav";
import HomeBanner from "./components/HomeBanner";
import SearchPage from "./components/SearchPage";

import MenuList from "./components/MenuList.vue";
import FindMusiList from "./components/FindMusiList.vue";
import SelectMusicVideo from "./components/SelectMusicVideo.vue";

export default defineComponent({
  name: "Home",
  components: {
    Nav,
    HomeBanner,
    MenuList,
    FindMusiList,
    SelectMusicVideo,
    SearchPage,
  },
  setup() {
    const selectId = ref(1);
    const showSearch = ref(false);
    const navData = reactive([
      { id: 1, name: "我的" },
      { id: 2, name: "发现" },
      { id: 3, name: "云村" },
      { id: 4, name: "视频" },
    ]);

    const handLeftClick = () => {
      console.log(111);
    };
    const handRightClick = () => {
      showSearch.value = true;
    };
    const handleChange = (num: number) => {
      selectId.value = num;
    };

    return {
      handLeftClick,
      handRightClick,
      handleChange,
      selectId,
      navData,
      showSearch,
    };
  },
});
</script>

<style lang="scss" scoped></style>
