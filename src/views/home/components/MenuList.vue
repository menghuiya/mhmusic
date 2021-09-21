<template>
  <div class="menu-box">
    <swiper :slides-per-view="5">
      <swiper-slide
        v-for="item in menuListData"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="menu-card">
          <div class="menu-icon">
            <i :class="`iconfont ${item.icon}`"></i>
          </div>
          <div class="menu-name">{{ item.name }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, reactive, ref } from "vue";
import { MenuItem } from "./types";

export default defineComponent({
  name: "MenuList",
  props: {},
  setup() {
    const menuListData = reactive<MenuItem[]>([
      { id: 1, name: "每日推荐", icon: "icon-tubiao204" },
      { id: 2, name: "私人FM", icon: "icon-shouyinji1" },
      { id: 3, name: "歌单", icon: "icon-SanMiAppoutlinei" },
      { id: 4, name: "排行榜", icon: "icon-paihangbang" },
      { id: 5, name: "每日推荐", icon: "icon-tubiao204" },
    ]);
    const handleClick = (menuData: MenuItem) => {
      console.log(menuData);
      if (menuData.id === 1) {
        router.push("/DayRecommd");
      }
    };
    return {
      menuListData,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.menu-box {
  padding: 0.4rem 0;
  border-bottom: 1px solid #f8f8f8;
  @include border_color("border-color");
  .swiper-slide {
    height: 2rem;

    font-size: 0.14rem;
    .menu-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.25rem;
      .menu-icon {
        width: 1.4rem;
        height: 1.4rem;
        background-color: #f5d3d3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .iconfont {
          color: red;
          font-size: 0.7rem;
        }
      }
      .menu-name {
        font-size: 0.3rem;
        height: 0.5rem;
        overflow: hidden;
        color: #82848a;
      }
    }
  }
}
</style>
