import Nav from "@/components/Nav/Nav";
import SliderNav from "@/components/SliderNav/SliderNav";
import { ClickEventFuncType } from "@/utils/types";
import { defineComponent, onMounted, ref } from "vue";
import BoutiqueSheet from "./components/BoutiqueSheet";
import CategoryPage from "./components/CategoryPage";
import CommonSheet from "./components/CommonSheet";
import RecomondSheet from "./components/RecomondSheet";
import "./index.scss";

export default defineComponent({
  name: "sheetSquare",
  setup() {
    const swipeRef = ref(); //swiper的实例
    const cateVisibel = ref(false);
    const searchNavData = [
      { id: 0, name: "推荐" },
      { id: 1, name: "官方" },
      { id: 2, name: "视频歌单" },
      { id: 3, name: "精品" },
      { id: 4, name: "欧美" },
      { id: 5, name: "流行" },
      { id: 6, name: "电子" },
      { id: 7, name: "轻音乐" },
      { id: 8, name: "摇滚" },
    ];
    const currentSliderId = ref(0);
    const changeNav: ClickEventFuncType = (index: number) => (e) => {
      currentSliderId.value = index;
    };
    const sliderChange = (value: number) => {
      currentSliderId.value = value;
      swipeToCurrentTab(value);
    };

    const swipeToCurrentTab = (index: number) => {
      // console.log(swipeRef.value);
      if (swipeRef.value) {
        swipeRef.value.slideTo(index, 500, false);
      }
    };

    const onSwiper = (swiper: any) => {
      swipeRef.value = swiper;
    };

    const onSlideChange = (swiper: any) => {
      currentSliderId.value = swiper.activeIndex;
    };

    const openCate = () => {
      cateVisibel.value = true;
    };
    const closeCate = () => {
      cateVisibel.value = false;
    };

    const renderSheet = () => {
      return searchNavData.map((item: any, index: number) => {
        if (item.name === "推荐") {
          return (
            <swiper-slide class="sheetsquare-body-slider">
              <RecomondSheet />
            </swiper-slide>
          );
        } else if (item.name === "精品") {
          return (
            <swiper-slide class="sheetsquare-body-slider">
              <BoutiqueSheet />
            </swiper-slide>
          );
        } else {
          return (
            <swiper-slide class="sheetsquare-body-slider">
              <CommonSheet
                visible={index === currentSliderId.value}
                cat={item.name}
              />
            </swiper-slide>
          );
        }
      });
    };

    onMounted(() => {
      setTimeout(() => {
        cateVisibel.value = true;
      }, 100);
    });

    return () => {
      return (
        <div class="sheetsquare">
          <div class="sheetsquare-head">
            <Nav
              backStatus={true}
              iconSize="0.5rem"
              class="creator-center-nav"
              v-slots={{
                right: () => null,
                center: () => <span>歌单广场</span>,
              }}
            />
            <div class="sheetsquare-head-slidernav">
              <SliderNav
                sliderData={searchNavData}
                currentSliderId={currentSliderId.value}
                onChange={sliderChange}
              />
              <div class="slidernav-category" onClick={openCate}>
                <i class="iconfont icon-fenlei"></i>
              </div>
            </div>
          </div>

          <div class="sheetsquare-body">
            <swiper
              class="sheetsquare-body-track"
              onSwiper={onSwiper}
              onSlideChange={onSlideChange}
            >
              {renderSheet()}
            </swiper>
          </div>
          <CategoryPage show={cateVisibel.value} onClose={closeCate} />
        </div>
      );
    };
  },
});
