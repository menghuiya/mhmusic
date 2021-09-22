import Nav from "@/components/Nav/Nav";
import SliderNav from "@/components/SliderNav/SliderNav";
import { ClickEventFuncType } from "@/utils/types";
import { defineComponent, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "sheetSquare",
  setup() {
    const searchNavData = [
      { id: 0, name: "综合", type: 1018 },
      { id: 1, name: "单曲", type: 1 },
      { id: 2, name: "歌单", type: 1000 },
      { id: 3, name: "视频", type: 1014 },
      { id: 4, name: "歌手", type: 100 },
      { id: 5, name: "歌词", type: 1006 },
      { id: 6, name: "用户", type: 1002 },
      { id: 7, name: "电台", type: 1009 },
      { id: 8, name: "专辑", type: 10 },
      { id: 9, name: "MV", type: 1004 },
    ];
    const currentSliderId = ref(0);
    const changeNav: ClickEventFuncType = (index: number) => (e) => {
      currentSliderId.value = index;
    };
    const sliderChange = (value: number) => {
      currentSliderId.value = value;
    };

    return () => {
      return (
        <div class="sheetsquare">
          <div class="sheetsquare-head">
            <Nav
              backStatus={true}
              iconSize="0.6rem"
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
              <div class="slidernav-category">
                <i class="iconfont icon-fenlei"></i>
              </div>
            </div>
          </div>

          <div class="sheetsquare-body">
            {searchNavData.map((item: any, index: number) => {
              return (
                <div
                  onClick={changeNav(index)}
                  style={{
                    color: currentSliderId.value === index ? "red" : "",
                  }}
                >
                  点击切换到{item.name}
                </div>
              );
            })}
            {searchNavData.map((item: any, index: number) => {
              return (
                <div
                  onClick={changeNav(index)}
                  style={{
                    color: currentSliderId.value === index ? "red" : "",
                  }}
                >
                  点击切换到{item.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    };
  },
});
