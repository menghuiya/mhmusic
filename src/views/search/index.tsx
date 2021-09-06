/* eslint-disable */
import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  reactive,
} from "vue";
import "./index.scss";
import { searchNavData } from "./searchBaseData";
import { getSearchData } from "@/api/search";
//引入九个组件 暂时没有想到好的
import LoadingCom from "@/components/Loading/LoadingCom";
import SearchAlbum from "./components/SearchAlbum";
import SearchAllPage from "./components/SearchAllPage";
import SearchMusicSheet from "./components/SearchMusicSheet";
import SearchSinger from "./components/SearchSinger";
import SearchSingleSong from "./components/SearchSingleSong";
import SearchUser from "./components/SearchUser";
import SearchVideos from "./components/SearchVideos";
import router from "@/router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "index",
  components: {},
  props: {},
  setup(props, { emit, slots }) {
    const route = useRoute();
    const inputRef = ref();
    const keyword = ref("");
    const realkeyword = ref("");
    const placeholder = ref("搜索音乐、视频、播客、歌词");
    const navActiveId = ref(0); //选中tabid
    const navBoxRef = ref(); // nav的refs
    const navUnderlinStyle = ref<CSSProperties>({});
    const swipeRef = ref(); //swiper的实例
    const seachData = reactive<any>({
      1018: null, //综合
      1: null, //单曲
      1000: null, //歌单
      1014: null, //视频
      100: null, //歌手
      1006: null, //歌词
      1002: null, //用户
      1009: null, //电台
      10: null, //专辑
      1004: null, //mv
    });

    const closeSearch = () => {
      clear();
      router.go(-1);
    };
    const clear = () => {
      keyword.value = "";
      router.go(-1);
    };

    const inputData = (event: any) => {
      keyword.value = event.target.value;
      if (!keyword.value) {
        router.go(-1);
      }
      // console.log(keyword.value);
    };
    const onFocus = (event: any) => {
      // keyword.value = event.target.value;
      // console.log("onFocus");
    };
    const onBlur = (event: any) => {
      // keyword.value = event.target.value;
      // console.log("onBlur");
    };

    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };

    type ClickHandler = (item: any) => (e: MouseEvent) => void;
    const handleNavItem: ClickHandler = (item) => (e) => {
      e.preventDefault();
      navActiveId.value = item.id;
      swipeToCurrentTab(navActiveId.value);
    };

    const getData = (type: number) => {
      getSearchData(keyword.value, type).then((res: any) => {
        seachData[type] = res.result;
        // console.log(type, seachData[type]);
      });
      // seachData[type] = {};
      // console.log("切换啦", type);
    };
    watch(
      () => navActiveId.value,
      () => {
        nextTick(() => {
          const navActive: any = document.querySelector(".msearch-nav-active");
          const navWidth = navBoxRef.value.offsetWidth;
          if (navActive) {
            const navOffsetWidth = navActive.offsetLeft;
            const diffWidth = (navWidth - navActive.offsetWidth) / 2; //中间值
            const targetWidth = navOffsetWidth - diffWidth;
            navBoxRef.value.scrollLeft = targetWidth;
            moveUnderLine(navActive.offsetWidth, navOffsetWidth);
            if (!seachData[searchNavData[navActiveId.value].type]) {
              getData(searchNavData[navActiveId.value].type);
            }
          }
        });
      }
    );

    onMounted(() => {
      keyword.value = route.query.keyword + "" || "";
      nextTick(() => {
        const navActive: any = document.querySelector(".msearch-nav-active");
        moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
        if (keyword.value) {
          getData(searchNavData[navActiveId.value].type);
        }
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

    const hanleMoreClick = (id: number) => {
      navActiveId.value = id;
      swipeToCurrentTab(navActiveId.value);
    };

    return () => {
      return (
        <div class="msearch">
          <div class="msearch-top">
            <div class="msearch-head">
              <i
                class="iconfont icon-fanhui msearch-head-back"
                onClick={closeSearch}
              ></i>
              <div class="msearch-head-box">
                <i class="iconfont icon-sousuo"></i>
                <input
                  class="msearch-head-input"
                  type="text"
                  placeholder={placeholder.value}
                  value={keyword.value}
                  onInput={inputData}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  ref={inputRef}
                />
                <i
                  class="iconfont icon-shanchu2"
                  onClick={clear}
                  v-show={keyword.value}
                ></i>
              </div>
            </div>
            <div class="msearch-nav" ref={navBoxRef}>
              <div class="msearch-nav-box">
                {searchNavData.map((item) => {
                  return (
                    <div
                      class={[
                        "msearch-nav-item",
                        navActiveId.value === item.id
                          ? "msearch-nav-active"
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
                class="msearch-nav-underline"
                style={navUnderlinStyle.value}
              ></i>
            </div>
          </div>
          <div class="msearch-body">
            <swiper
              class="msearch-body-track"
              onSwiper={onSwiper}
              onSlideChange={onSlideChange}
            >
              <swiperSlide>
                {seachData[1018] ? (
                  <SearchAllPage
                    data={seachData[1018]}
                    onMoreClick={hanleMoreClick}
                  />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>
              <swiperSlide>
                {seachData[1] ? (
                  <SearchSingleSong data={seachData[1]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>
              <swiperSlide>
                {seachData[1000] ? (
                  <SearchMusicSheet data={seachData[1000]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>
              <swiperSlide>
                {seachData[1014] ? (
                  <SearchVideos data={seachData[1014]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>
              <swiperSlide>
                {seachData[100] ? (
                  <SearchSinger data={seachData[100]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>

              <swiperSlide>
                {seachData[1002] ? (
                  <SearchUser data={seachData[1002]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>

              <swiperSlide>
                {seachData[10] ? (
                  <SearchAlbum data={seachData[10]} />
                ) : (
                  <LoadingCom />
                )}
              </swiperSlide>
            </swiper>
          </div>
        </div>
      );
    };
  },
});
