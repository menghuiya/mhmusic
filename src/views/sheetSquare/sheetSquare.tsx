import { getHighqualityTags } from "@/api/songSheet";
import Nav from "@/components/Nav/Nav";
import Popup from "@/components/Popup/Popup";
import SliderNav from "@/components/SliderNav/SliderNav";
import { ClickEventFuncType } from "@/utils/types";
import { defineComponent, onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import BoutiqueSheet from "./components/BoutiqueSheet";
import CategoryPage from "./components/CategoryPage";
import CommonPage from "./components/CommonPage";
import CommonSheet from "./components/CommonSheet";
import RecomondSheet from "./components/RecomondSheet";
import "./index.scss";

export default defineComponent({
  name: "sheetSquare",
  setup() {
    const swipeRef = ref(); //swiper的实例
    const cateVisibel = ref(false);
    const commpageVisibel = ref(false);
    const commpageTitle = ref("");
    const searchNavData = ref<any>([
      { id: 0, name: "推荐" },
      { id: 1, name: "官方" },
      { id: 2, name: "视频歌单" },
      { id: 3, name: "精品" },
    ]);
    const currentSliderId = ref(0);
    const changeState = ref(false);
    const screenVisible = ref(false);
    const currentScreenTag = ref("");
    const screenTagData = ref([]);

    const getLoaclNavData = () => {
      if (localStorage.getItem("baseSheetCateData")) {
        const tempData = JSON.parse(
          localStorage.getItem("baseSheetCateData") || "[]"
        );
        if (Array.isArray(tempData) && tempData.length >= 4) {
          const tempNavData: { id: number; name: any }[] = [];
          tempData.forEach((item: any, index: number) => {
            tempNavData.push({
              id: index,
              name: item.name,
            });
          });
          searchNavData.value = tempNavData;
          changeState.value = false;
          if (currentSliderId.value > 4) {
            if (currentSliderId.value > tempNavData.length - 1) {
              currentSliderId.value = tempNavData.length - 1;
            }
          }
        }
      }
      changeState.value = true;
    };
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
    const changeCate = () => {
      getLoaclNavData();
    };
    const handleCommon = (value: { visible: boolean; data: string }) => {
      commpageVisibel.value = value.visible;
      commpageTitle.value = value.data;
    };

    const getScreenTagData = () => {
      getHighqualityTags().then((res: any) => {
        screenTagData.value = res.tags;
      });
    };

    const screenClick = (value = false) => {
      if (value && !screenTagData.value.length) {
        getScreenTagData();
      }
      screenVisible.value = value;
    };
    const handleTag = (value: any) => {
      currentScreenTag.value = value;
      screenClick(false);
    };

    const renderSheet = () => {
      return searchNavData.value.map((item: any, index: number) => {
        if (item.name === "推荐") {
          return (
            <swiper-slide class="sheetsquare-body-slider">
              <RecomondSheet />
            </swiper-slide>
          );
        } else if (item.name === "精品") {
          return (
            <swiper-slide class="sheetsquare-body-slider">
              <BoutiqueSheet
                show={3 === currentSliderId.value}
                onScreen={screenClick}
                tag={currentScreenTag.value}
              />
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
      getLoaclNavData();
    });

    onBeforeRouteLeave((to, from) => {
      //离开当前的组件，触发
      if (to.name === "Home") {
        if (commpageVisibel.value) {
          commpageVisibel.value = false;
          return false;
        }
        if (cateVisibel.value) {
          cateVisibel.value = false;
          return false;
        }
      }
    });

    const renderScreen = () => {
      return (
        <div class="screen">
          <div class="screen-body">
            <div
              class={[
                "screen-body-all",
                currentScreenTag.value === "" ? "screen-active" : "",
              ]}
              onClick={() => handleTag("")}
            >
              全部精品
            </div>
            <div class="sheetcate-body-group">
              {screenTagData.value.map((item: any, index: number) => {
                return (
                  <div
                    class={["sheetcate-body-group-item"]}
                    onClick={() => handleTag(item.name)}
                  >
                    <div
                      class={[
                        "sheetcate-body-group-item-card",
                        currentScreenTag.value === item.name
                          ? "screen-active"
                          : "",
                      ]}
                    >
                      <span class="sheetcate-card-name">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };

    return () => {
      return (
        <div class="sheetsquare-content">
          <div class="sheetsquare-box">
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
                    sliderData={searchNavData.value}
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
            </div>
            <CategoryPage
              show={cateVisibel.value}
              onClose={closeCate}
              onChange={changeCate}
              onSlide={sliderChange}
              onGopage={handleCommon}
            />
          </div>
          <CommonPage
            show={commpageVisibel.value}
            onClose={handleCommon}
            title={commpageTitle.value}
          />
          <Popup
            direction="bottom"
            style={{
              height: "60%",
              borderTopLeftRadius: "0.25rem",
              borderTopRightRadius: "0.25rem",
              overflow: "hidden",
            }}
            onClose={screenClick}
            visible={screenVisible.value}
            v-slots={{
              head: () => (
                <div class="pop-head screen-head">
                  <div class="screen-head-left"></div>
                  <div class="screen-head-center">所有精品歌单</div>
                  <div class="screen-head-right">
                    <div
                      class="screen-head-close"
                      onClick={() => screenClick(false)}
                    >
                      <i class="iconfont icon-shanchu"></i>
                    </div>
                  </div>
                </div>
              ),
              default: () => <>{renderScreen()}</>,
            }}
          />
        </div>
      );
    };
  },
});
