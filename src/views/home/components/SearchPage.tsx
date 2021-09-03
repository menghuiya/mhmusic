import {
  defineComponent,
  nextTick,
  onMounted,
  ref,
  Transition,
  watch,
} from "vue";
import "./search.scss";
import TitleLine from "@/components/TitleLine/TitleLine";
import { getHotSearch, getDefaultSearch } from "@/api/public";
import { musicAreaData, recomeActivitData } from "./baseData";
import router from "@/router";
export default defineComponent({
  name: "HomeBanner",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const inputRef = ref();
    const keyword = ref("");
    const realkeyword = ref("");
    const placeholder = ref("搜索音乐、视频、播客、歌词");
    const hotSerachData = ref([]);
    const defaultImg = require("@/assets/images/activ01.png");

    const closeSearch = () => {
      clear();
      emit("close");
    };
    const clear = () => {
      keyword.value = "";
    };

    const inputData = (event: any) => {
      keyword.value = event.target.value;
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

    const inputKeyDown = (event: Event | any) => {
      if (event.keyCode === 13) {
        router.push({
          path: "/search",
          query: {
            keyword: keyword.value || realkeyword.value,
          },
        });
      }
    };

    const getHotSearchData = () => {
      getHotSearch().then((res: any) => {
        hotSerachData.value = res.data;
      });
    };
    const getDefaultSearchData = () => {
      getDefaultSearch().then((res: any) => {
        console.log(res);
        placeholder.value = res.data.showKeyword;
        realkeyword.value = res.data.realkeyword;
      });
    };

    onMounted(() => {
      getHotSearchData();
    });

    watch(
      () => props.visible,
      (newValue) => {
        if (newValue) {
          nextTick(() => {
            inputRef.value.focus();
          });
          getDefaultSearchData();
          // console.log(inputRef.value);
        }
      }
    );

    return () => {
      return (
        <Transition name="searchpage-fade">
          <div class="searchpage" v-show={props.visible}>
            <div class="searchpage-head">
              <div class="searchpage-head-box">
                <i class="iconfont icon-sousuo"></i>
                <input
                  class="searchpage-head-input"
                  type="text"
                  placeholder={placeholder.value}
                  value={keyword.value}
                  onInput={inputData}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  ref={inputRef}
                  autofocus={true}
                  onKeydown={inputKeyDown}
                />
                <i
                  class="iconfont icon-shanchu2"
                  onClick={clear}
                  v-show={keyword.value}
                ></i>
              </div>
              <div class="searchpage-head-cancel" onClick={closeSearch}>
                取消
              </div>
            </div>
            <div class="searchpage-body">
              <div class="searchpage-body-history">
                <div class="history-title">历史</div>
                <div class="history-body">
                  <div class="history-body-card">水星记</div>
                  <div class="history-body-card">六点半演出</div>
                  <div class="history-body-card">蛤蟆皮</div>
                </div>
              </div>
              <div class="searchpage-body-research">
                <div class="research-title">推荐搜索：</div>
                <div class="research-body">
                  <div class="research-body-card">陈奕迅</div>
                  <div class="research-body-card">许嵩</div>
                  <div class="research-body-card">宝宝巴士</div>
                  <div class="research-body-card">隔壁老樊</div>
                  <div class="research-body-card">刘大壮</div>
                </div>
              </div>
              <TitleLine
                showType="left"
                title="热搜榜"
                btnName="播放"
                noPadding={true}
                icon="icon-Controls-71"
                titleStyle={{
                  fontSize: "0.36rem",
                  letterSpacing: "0",
                }}
              />
              <div class="searchpage-body-hotlist">
                {hotSerachData.value.map((item: any, index: number) => {
                  return (
                    <div class="hot-card">
                      <span class="hot-card-index">{index + 1}</span>
                      <span class="hot-card-name">{item.searchWord}</span>
                      <img
                        v-show={item.iconUrl}
                        src={item.iconUrl}
                        alt=""
                        class="hot-card-tag"
                      />
                    </div>
                  );
                })}
              </div>
              <div class="searchpage-body-musicarea">
                <div class="musicarea-title">音乐专区</div>
                <div class="musicarea-body">
                  {musicAreaData.map((item) => {
                    return (
                      <div
                        class="musicarea-body-card"
                        style={{
                          background: item.bgStyle,
                        }}
                      >
                        <div class="musicarea-body-card-head">
                          <div class="musicarea-body-card-head-title">
                            {item.title}
                          </div>
                          <div class="musicarea-body-card-head-icon">🎶</div>
                        </div>
                        <div class="musicarea-body-card-bottom">
                          {item.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="searchpage-body-activity">
                <div class="activity-title">推荐活动</div>
                <div class="activity-body">
                  {recomeActivitData.map((item) => {
                    return (
                      <div class="activity-body-card">
                        <img
                          src={defaultImg}
                          alt=""
                          class="activity-body-card-cover"
                        />
                        <div class="activity-body-card-title">{item.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Transition>
      );
    };
  },
});
