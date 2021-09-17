<template>
  <div class="swiper-box">
    <swiper
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :autoplay="true"
      v-if="swiperData.length"
    >
      <swiper-slide
        v-for="item in swiperData"
        :key="item.id"
        @click="swiperClick(item)"
      >
        <img :src="item.imgSrc" :alt="item.name" />
        <div class="swiper-tag" :style="`background-color:${item.titleColor}`">
          {{ item.typeTitle }}
        </div>
      </swiper-slide>
    </swiper>
    <swiper v-else>
      <swiper-slide>
        <div class="swiper-size-load"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SwiperDateOptions } from "./type";
export default defineComponent({
  name: "MSwiper",
  props: {
    swiperData: {
      type: Array as PropType<SwiperDateOptions[]>,
      default: () => [],
    },
  },
  setup() {
    const onSwiper = (swiper: any) => {
      // console.log(swiper);
    };
    const onSlideChange = (swiper: any) => {
      // console.log(swiper);
    };
    const swiperClick = (swiper: SwiperDateOptions) => {
      console.log(swiper);
    };
    return {
      onSwiper,
      onSlideChange,
      swiperClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.swiper-box {
  margin: 0.1rem 0;
  .swiper-slide {
    padding: 0 0.25rem;
    height: 3.5rem;
    .swiper-size-load {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
      background-color: #c0c4cc;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
      background-color: #c0c4cc;
    }
    .swiper-tag {
      margin: 0 0.25rem;
      font-size: 0.32rem;
      padding: 0.01rem 0.2rem;
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      border-top-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }
}
</style>
