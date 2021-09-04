import { App } from "vue";

// swiper 额外配置
import SwiperCore, { Pagination, Autoplay } from "swiper";

// swiper 单独样式 scss

import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

// swiper 必备组件
import { Swiper, SwiperSlide } from "swiper/vue";

//使用额外组件
SwiperCore.use([Pagination, Autoplay]);

// 全局注册swiper 组件
const plugins = [Swiper, SwiperSlide];

const swiper = {
  install: function(app: App<Element>) {
    plugins.forEach((item) => {
      app.component(item.name, item);
    });
  },
};

export default swiper;
