import {
  computed,
  defineComponent,
  onMounted,
  ref,
  Transition,
  watch,
} from "vue";
import "./play.scss";
import { imgToBlob } from "@/utils/tool";
import Nav from "../Nav/Nav";
declare function require(img: string): string; // 声明

import { CustomEventFuncType, LyricItem } from "@/utils/types";
import { useStore } from "vuex";

export default defineComponent({
  name: "PlayMusicPage",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    playing: {
      type: Boolean,
      default: false,
    },
    musicData: {
      type: Object,
      defautl: null,
    },
    onChangePlaying: Function as CustomEventFuncType<null>,
    onPlayReadList: Function as CustomEventFuncType<null>,
  },
  emits: ["close", "change-playing", "play-read-list"],
  setup(props, { emit, slots }) {
    const pageBg = ref("");
    const store = useStore();
    const showMusic = ref(false);
    const musciWordRef = ref();
    watch(
      () => props.musicData,
      (newValue) => {
        if (newValue && props.musicData) {
          imgToBlob(
            props.musicData.al.picUrl + "?imageView=1&thumbnail=125x0",
            (blur: any) => {
              pageBg.value = blur;
            },
            100,
            -0.1
          );
        }
      }
    );

    watch(
      () => store.state.playCurrentTime,
      () => {
        if (showMusic.value) {
          const wordActive: any = document.querySelector(".word-active");
          if (wordActive) {
            const offsetTop = wordActive.offsetTop;
            const height = musciWordRef.value.offsetHeight;
            if (offsetTop > height / 2) {
              musciWordRef.value.scrollTop = wordActive.offsetTop - height / 2;
            }
            // console.log(wordActive, offsetTop, height);
          }
        }
      }
    );

    const handleLeftClick = () => {
      emit("close");
    };
    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const changePlaying = () => {
      emit("change-playing");
    };

    const handleReadList = () => {
      emit("play-read-list");
    };

    const changeMusicWord = () => {
      showMusic.value = !showMusic.value;
    };

    const changePreMusic = () => {
      if (store.state.playCurrentIndex === 0) {
        store.commit("setPlayCurrntIndex", store.state.playList.length - 1);
      } else {
        store.commit("setPlayCurrntIndex", store.state.playCurrentIndex - 1);
      }
    };

    const changeNextMusic = () => {
      if (store.state.playCurrentIndex === store.state.playList.length - 1) {
        store.commit("setPlayCurrntIndex", 0);
      } else {
        store.commit("setPlayCurrntIndex", store.state.playCurrentIndex + 1);
      }
    };

    const navSLots = {
      center: () => (
        <div class="playing-nav-music">
          <div
            class={[
              "playing-nav-music-name",
              props.playing ? "playing-nav-music-scoller" : "",
            ]}
          >
            <span
              data-text={
                props.musicData
                  ? props.musicData.name
                  : "还未选择歌曲还未选择歌曲还未选择歌曲"
              }
            >
              {props.musicData
                ? props.musicData.name
                : "还未选择歌曲还未选择歌曲还未选择歌曲"}
            </span>
          </div>
          <div class="playing-nav-music-author">
            {props.musicData ? props.musicData.ar[0].name : "未知"}
          </div>
        </div>
      ),
    };

    const needleAb = require("@/assets/images/needle-ab.png");
    const needleBoder = require("@/assets/images/play-boder.png");
    const renderMusicList = () => {
      return (
        <>
          <div class="empty-word"></div>
          {store.getters.lyricList.map(
            (item: LyricItem, index: number, arr: any) => {
              return (
                <div
                  class={[
                    "word-line",
                    store.state.playCurrentTime * 1000 > item.time &&
                    store.state.playCurrentTime * 1000 < item.nextTime
                      ? "word-active"
                      : "",
                  ]}
                >
                  {item.lyric}
                </div>
              );
            }
          )}
        </>
      );
    };
    const renderPlayCenter = () => {
      return (
        <div class="playing-center">
          <img
            src={needleAb}
            alt=""
            class={[
              "playing-center-needle",
              props.playing ? "playing-center-needle-active" : "",
            ]}
            v-show={!showMusic.value}
          />
          <div
            class={[
              "playing-center-box",
              props.playing ? "playing-center-active" : "",
            ]}
            v-show={!showMusic.value}
            onClick={changeMusicWord}
          >
            <img src={needleBoder} alt="" class="playing-center-box-boder" />
            {props.musicData ? (
              <img
                src={props.musicData.al.picUrl}
                alt=""
                class="playing-center-box-musimg"
              />
            ) : (
              ""
            )}
          </div>
          <div class="playing-center-word" v-show={showMusic.value}>
            <div
              class="playing-center-word-container"
              ref={musciWordRef}
              onClick={changeMusicWord}
            >
              {renderMusicList()}
            </div>
          </div>
        </div>
      );
    };

    const renderPlayBottom = () => {
      return (
        <div class="playing-bottom-empty">
          <div class="playing-bottom">
            <div class="playing-bottom-info">
              <div class="playing-bottom-info-row">
                <i class="iconfont icon-xihuan"></i>
              </div>
              <div class="playing-bottom-info-row">
                <i class="iconfont icon-xiazai"></i>
              </div>
              <div class="playing-bottom-info-row">
                <i class="iconfont icon-huiyuan"></i>
              </div>
              <div class="playing-bottom-info-row">
                <i class="iconfont icon-pinglun"></i>
              </div>
              <div class="playing-bottom-info-row">
                <i class="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div class="playing-bottom-process">先等等</div>
            <div class="playing-bottom-action">
              <div class="playing-bottom-action-row">
                <i class="iconfont icon-xunhuan"></i>
              </div>
              <div class="playing-bottom-action-row" onClick={changePreMusic}>
                <i class="iconfont icon-shangyishoushangyige"></i>
              </div>
              <div
                class="playing-bottom-action-row row-play"
                onClick={changePlaying}
              >
                {props.playing ? (
                  <i class="iconfont icon-bofang1"></i>
                ) : (
                  <i class="iconfont icon-bofang"></i>
                )}
              </div>
              <div class="playing-bottom-action-row" onClick={changeNextMusic}>
                <i class="iconfont icon-xiayigexiayishou"></i>
              </div>
              <div class="playing-bottom-action-row" onClick={handleReadList}>
                <i class="iconfont icon-bofangliebiao"></i>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return () => {
      return (
        <Transition name="play-page">
          <div
            class="playing"
            v-show={props.visible}
            style={{
              backgroundImage: `url(${pageBg.value})`,
            }}
            // onTouchmove={preventTouchMove}
          >
            <Nav
              leftIcon="icon-xiangxia"
              rightIcon="icon-fenxiang"
              onLeftClick={handleLeftClick}
              iconColor="#fff"
              v-slots={navSLots}
              style={{
                position: "relative",
              }}
            ></Nav>
            {renderPlayCenter()}
            {renderPlayBottom()}
          </div>
        </Transition>
      );
    };
  },
});
