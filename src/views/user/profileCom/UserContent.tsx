import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import "./index.scss";
import { ClickEventFuncType } from "@/utils/types";
import TitleLine from "@/components/TitleLine/TitleLine";
import CellItem from "@/components/Cell/CellItem";

export default defineComponent({
  name: "UserContent",
  props: {
    visible: Boolean,
    overHeight: Boolean,
  },
  setup(props, { emit, slots }) {
    const navActiveId = ref(0); //选中tabid
    const navBoxRef = ref(); // nav的refs
    const navUnderlinStyle = ref<CSSProperties>({});
    const swipeRef = ref(); //swiper的实例
    const defaultImg = require("@/assets/images/activ01.png");
    const baseNavData = [
      { id: 0, name: "主页", type: 1018 },
      { id: 1, name: "动态", type: 1 },
      { id: 2, name: "播客", type: 1000 },
    ];
    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };

    const handleNavItem: ClickEventFuncType = (item) => (e) => {
      e.preventDefault();
      navActiveId.value = item.id;
      swipeToCurrentTab(navActiveId.value);
    };

    watch(
      () => navActiveId.value,
      () => {
        nextTick(() => {
          const navActive: any = document.querySelector(".ucontent-nav-active");
          const navWidth = navBoxRef.value.offsetWidth;
          if (navActive) {
            const navOffsetWidth = navActive.offsetLeft;
            const diffWidth = (navWidth - navActive.offsetWidth) / 2; //中间值
            const targetWidth = navOffsetWidth - diffWidth;
            navBoxRef.value.scrollLeft = targetWidth;
            moveUnderLine(navActive.offsetWidth, navOffsetWidth);
            // if (!seachData[searchNavData[navActiveId.value].type]) {
            //   getData(searchNavData[navActiveId.value].type);
            // }
          }
        });
      }
    );

    watch(
      () => props.overHeight,
      (newValue) => {
        if (newValue) {
          navBoxRef.value.style.backgroundColor = "#fff";
        } else {
          navBoxRef.value.style.backgroundColor = "";
        }
      }
    );

    onMounted(() => {
      nextTick(() => {
        const navActive: any = document.querySelector(".ucontent-nav-active");
        moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
      });
      swipeToCurrentTab(navActiveId.value);
    });

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
      navActiveId.value = swiper.activeIndex;
    };
    return () => {
      return (
        <div class="ucontent">
          <div class="ucontent-nav" ref={navBoxRef}>
            <div class="ucontent-nav-box">
              {baseNavData.map((item: any) => {
                return (
                  <div
                    class={[
                      "ucontent-nav-item",
                      navActiveId.value === item.id
                        ? "ucontent-nav-active"
                        : "",
                    ]}
                    onClick={handleNavItem(item)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <i
              class="ucontent-nav-underline"
              style={navUnderlinStyle.value}
            ></i>
          </div>
          <div class="ucontent-body">
            <swiper
              class="ucontent-body-track"
              onSwiper={onSwiper}
              onSlideChange={onSlideChange}
            >
              <swiper-slide>
                <div class="ucontent-body-cards">
                  <div class="ucontent-body-card">
                    <div class="ucontent-body-card-top">
                      唱片收藏架 <br />
                      表达音乐品味
                    </div>
                    <div class="ucontent-body-card-bottom">
                      布置唱片架<i class="iconfont icon-qianjin1"></i>
                    </div>
                  </div>
                  <div class="ucontent-body-card">
                    <div class="ucontent-body-card-top">
                      展示动态图片 <br />
                      让别人了解你
                    </div>
                    <div class="ucontent-body-card-bottom">
                      使用相册<i class="iconfont icon-qianjin1"></i>
                    </div>
                  </div>
                  <div class="ucontent-body-card">
                    <div class="ucontent-body-card-top">
                      大声说出你的 <br />
                      愿望
                    </div>
                    <div class="ucontent-body-card-bottom">
                      写愿望清单<i class="iconfont icon-qianjin1"></i>
                    </div>
                  </div>
                </div>
                <div class="ucontent-group ucontent-body-info">
                  <TitleLine
                    showType="left"
                    title="基本信息"
                    btnName="领取村民证"
                    noPadding={false}
                    icon=""
                    titleStyle={{
                      fontSize: "0.4rem",
                      letterSpacing: "0",
                    }}
                  />
                  <div class="ucontent-body-info-item">
                    村龄：4年（2016年09月注册）
                  </div>
                  <div class="ucontent-body-info-item">性别：男</div>
                  <div class="ucontent-body-info-item">地区：四川 成都</div>
                  <div class="more-bottom">
                    <span>查看更多信息</span>
                    <i class="iconfont icon-qianjin1"></i>
                  </div>
                </div>
                <div class="ucontent-group ucontent-body-music">
                  <TitleLine
                    showType="left"
                    title="音乐品味"
                    btnName="播放"
                    noPadding={false}
                    showLeft={false}
                    icon="icon-Controls-71"
                    titleStyle={{
                      fontSize: "0.4rem",
                      letterSpacing: "0",
                    }}
                  />
                  <CellItem
                    arrow={false}
                    style={{
                      padding: "0.15rem 0",
                      margin: "0 0.25rem",
                    }}
                    v-slots={{
                      icon: () => (
                        <div class="user-cell-item-cover">
                          <img
                            class="user-cell-item-cover-img"
                            src={defaultImg}
                            alt=""
                          />
                          <i class="iconfont icon-paihang"></i>
                        </div>
                      ),
                      title: () => (
                        <div>
                          <div class="user-cell-item-name">听歌排行</div>
                          <div class="user-cell-item-fans">累计听歌xxx</div>
                        </div>
                      ),
                      right: () => null,
                    }}
                  ></CellItem>
                  <CellItem
                    arrow={false}
                    style={{
                      padding: "0.15rem 0",
                      margin: "0 0.25rem",
                    }}
                    v-slots={{
                      icon: () => (
                        <div class="user-cell-item-cover">
                          <img
                            class="user-cell-item-cover-img"
                            src={defaultImg}
                            alt=""
                          />
                          <i class="iconfont icon-xihuan1"></i>
                        </div>
                      ),
                      title: () => (
                        <div>
                          <div class="user-cell-item-name">我喜欢的音乐</div>
                          <div class="user-cell-item-fans">175首，播放31次</div>
                        </div>
                      ),
                      right: () => null,
                    }}
                  ></CellItem>
                </div>
                <div class="ucontent-group ucontent-body-music">
                  <TitleLine
                    showType="left"
                    title="创建的歌单"
                    btnName="播放"
                    noPadding={false}
                    showLeft={false}
                    icon="icon-Controls-71"
                    titleStyle={{
                      fontSize: "0.4rem",
                      letterSpacing: "0",
                    }}
                  />
                </div>
              </swiper-slide>
              <swiper-slide>dddd</swiper-slide>
              <swiper-slide>ssssddwawas</swiper-slide>
            </swiper>
          </div>
        </div>
      );
    };
  },
});
