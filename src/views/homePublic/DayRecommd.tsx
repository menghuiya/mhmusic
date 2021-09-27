import { getDaliyRecomd } from "@/api/home";
import CellItem from "@/components/Cell/CellItem";
import LoadingCom from "@/components/Loading/LoadingCom";
import Nav from "@/components/Nav/Nav";
import store from "@/store";
import { ClickEventFuncType } from "@/utils/types";
import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
import "./day.scss";

export default defineComponent({
  name: "DayRecommd",
  setup() {
    const dayRecommdData = ref<any[]>([]);
    const overflowHeight = ref(0);
    const headHeight = ref(0);
    const scrollHeight = ref(0);
    const overHeight = ref(false);
    const bgELe = ref();
    const navEle = ref();
    const navHeight = ref(0);
    const dateOpacity = ref(1);
    const titleOpacity = ref(0);
    const navStyle = reactive<CSSProperties>({
      background: undefined,
      color: "#fff",
      transition: "background 0.3s",
    });
    const vipImg = require("@/assets/images/vip2.png");
    const nowData = new Date().getDate();
    const nowMonth = new Date().getMonth() + 1;
    const scollerMore = () => {
      navStyle.background =
        "linear-gradient(to bottom, #E8766D, #ed9085) !important";
      navStyle.color = "#000";
    };
    const scollerLess = () => {
      navStyle.background = undefined;
      navStyle.color = "#fff";
    };
    const startScroll = (val: number) => {
      scrollHeight.value = val;
      if (scrollHeight.value >= headHeight.value) {
        overHeight.value = true;
      } else {
        overHeight.value = false;
      }
      computedOpacityForData();
      computedOpacityForTitle();
    };

    const computedOpacityForData = () => {
      if (overHeight.value) {
        dateOpacity.value = 0;
      } else {
        dateOpacity.value =
          1 - Number(((scrollHeight.value + 40) / headHeight.value).toFixed(2));
      }
    };
    const computedOpacityForTitle = () => {
      if (overHeight.value) {
        titleOpacity.value = 1;
      } else {
        titleOpacity.value = Number(
          (scrollHeight.value / headHeight.value).toFixed(2)
        );
      }
    };

    const getMusicData = () => {
      getDaliyRecomd().then((res: any) => {
        dayRecommdData.value = res.data.dailySongs;
      });
    };
    onMounted(() => {
      getMusicData();
      nextTick(() => {
        overflowHeight.value = bgELe.value.offsetHeight;
        headHeight.value = bgELe.value.offsetHeight;
        navHeight.value = navEle.value.offsetHeight;
        window.scroll(0, 0);
      });
    });
    const playMusic: ClickEventFuncType = (item: any) => (e) => {
      store.commit("setPlayList", item);
    };
    const playAllMusic = () => {
      if (dayRecommdData.value.length) {
        store.commit("setSheetPlayList", dayRecommdData.value);
        store.commit("setPlayCurrntIndex", 0);
      }
    };
    const testClick = (e: Event) => {
      e.stopPropagation();
      console.log(12);
    };
    return () => {
      return (
        <div class="dayrecommd">
          <Nav
            ref={navEle}
            backStatus={true}
            style={navStyle}
            onMoreNav={scollerMore}
            onLessNav={scollerLess}
            overflowHeight={overflowHeight.value}
            onScroll={startScroll}
            iconColor="#fff !important"
            v-slots={{
              center: () => (
                <span style={{ color: "#fff", opacity: titleOpacity.value }}>
                  每日推荐
                </span>
              ),
            }}
          />
          <div class="dayrecommd-info" ref={bgELe}>
            <div class="dayrecommd-info-box">
              <div
                class="dayrecommd-info-data"
                style={{
                  opacity: dateOpacity.value,
                }}
              >
                <div class="dayrecommd-info-data-date">
                  <span class="day">
                    {nowData > 9 ? nowData : "0" + nowData}
                  </span>
                  <span class="date-division">/</span>
                  <span class="month">
                    {" "}
                    {nowMonth > 9 ? nowMonth : "0" + nowMonth}
                  </span>
                </div>
                <div class="dayrecommd-info-data-history">
                  历史日推
                  <img src={vipImg} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="dayrecommd-playall">
            <CellItem
              arrow={false}
              icon="icon-Controls-02"
              iconColor="red !important"
              iconSize="0.5rem"
              v-slots={{
                title: () => (
                  <>
                    <div class="dayrecommd-playall-text" onClick={playAllMusic}>
                      播放全部
                    </div>
                    <span class="dayrecommd-playall-num">
                      （{dayRecommdData.value.length}）
                    </span>
                  </>
                ),
                right: () => (
                  <>
                    <i class="iconfont icon-n-check mh-select"></i>
                  </>
                ),
              }}
            ></CellItem>
          </div>
          <div class="dayrecommd-music">
            {dayRecommdData.value.length ? (
              dayRecommdData.value.map((item: any) => {
                return (
                  <CellItem
                    arrow={false}
                    class="dayrecommd-music-cell"
                    onClick={playMusic(item)}
                    v-slots={{
                      icon: () => null,
                      title: () => (
                        <div class="dayrecommd-music-music">
                          <img
                            v-imgLazy={item.al.picUrl}
                            class="dayrecommd-music-music-cover"
                            alt=""
                          />
                          <div>
                            <div class="dayrecommd-music-music-name">
                              {item.name}
                            </div>
                            <div class="dayrecommd-music-music-author">
                              {item.ar[0].name}-{item.al.name}
                            </div>
                          </div>
                        </div>
                      ),
                      right: () => (
                        <>
                          <i
                            class="iconfont icon-bofangqi dayrecommd-music-music-video"
                            onClick={testClick}
                          ></i>
                          <i class="iconfont icon-gengduo dayrecommd-music-music-more"></i>
                        </>
                      ),
                    }}
                  ></CellItem>
                );
              })
            ) : (
              <LoadingCom />
            )}
          </div>
        </div>
      );
    };
  },
});
