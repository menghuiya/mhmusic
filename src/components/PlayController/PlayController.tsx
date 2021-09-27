import { useStore } from "vuex";
import { defineComponent, onMounted, ref, watch } from "vue";
import "./index.scss";

import RedyPlayList from "./RedyPlayList";
import PlayMusicPage from "./PlayMusicPage";
import Progress from "../Progress/Progress";
import Toast from "../Toast";

export default defineComponent({
  name: "PlayController",
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = useStore();
    const playing = ref(false);
    const playLoop = ref(false);
    const popVisible = ref(false);
    const playPageVisible = ref(false);
    const playControRef = ref<any>(null);
    const playBufferTime = ref(0);
    const playPercentage = ref(0);
    const changePlayStatu = () => {
      if (!playControRef.value) {
        console.log("未选择音乐");
        return;
      }
      if (!playing.value) {
        playControRef.value.play();
      } else {
        playControRef.value.pause();
      }
      playing.value = !playing.value;
    };
    const openRedyList = () => {
      popVisible.value = true;
    };
    const closeRedyList = () => {
      popVisible.value = false;
    };

    const play = (index: number) => {
      console.log("index", index);
    };

    const openPlayPage = () => {
      playPageVisible.value = true;
    };
    const closePlayPage = () => {
      playPageVisible.value = false;
    };

    const playEnd = () => {
      if (store.state.playCurrentIndex === store.state.playList.length - 1) {
        store.commit("setPlayCurrntIndex", 0);
      } else {
        store.commit("setPlayCurrntIndex", store.state.playCurrentIndex + 1);
      }
    };

    const onPlay = () => {
      if (store.state.playList.length === 1) {
        playLoop.value = true;
      } else {
        playLoop.value = false;
      }
      playing.value = true;
      store.commit("setPlayTotalTime", playControRef.value.duration);
      document.title =
        "▶️" + store.state.playList[store.state.playCurrentIndex].name;
    };

    const onPause = () => {
      if (store.state.playCurrentIndex === null) {
        return false;
      }
      playing.value = false;
      document.title =
        store.state.playList[store.state.playCurrentIndex].name +
        "-单曲-梦回云音乐";
    };

    const computeplayPercentage = (noeTime: number) => {
      if (store.state.playCurrentIndex === null) {
        playPercentage.value = 0;
        return false;
      }
      playPercentage.value = (noeTime / playControRef.value.duration) * 100;
    };

    const onTimeupdate = () => {
      if (store.state.playCurrentIndex === null) {
        computeplayPercentage(0);
        return false;
      }
      const timeDisplay = playControRef.value.currentTime; //获取实时时间
      // const min = t
      computeplayPercentage(timeDisplay);
      const timeRanges = playControRef.value.buffered;
      if (timeRanges.length - 1 !== -1) {
        // 获取已缓存的时间  timeRanges.end(timeRanges.length - 1)
        playBufferTime.value = timeRanges.end(timeRanges.length - 1);
      }

      store.commit("setPlayCurrentTime", timeDisplay);
    };

    const changeMusicTime = (time: number) => {
      playControRef.value.currentTime = time;
    };

    const onError = (val: any) => {
      Toast.fail("播放失败，自动播放下一曲");
      playEnd();
    };

    watch(
      () => [store.state.playCurrentIndex, store.state.playList],
      (newValue) => {
        if (store.state.playCurrentIndex === null) {
          playing.value = false;
          return false;
        }
        if (!playing.value) {
          playing.value = true;
        }

        store.dispatch(
          "reqLyric",
          store.state.playList[store.state.playCurrentIndex]
        );
      }
    );

    const renderImg = () => {
      if (
        store.state.playList[store.state.playCurrentIndex] &&
        store.state.playList[store.state.playCurrentIndex].al
      ) {
        return (
          <img
            src={store.state.playList[store.state.playCurrentIndex].al.picUrl}
            class="play-left"
            alt="播放图片"
            onClick={openPlayPage}
          />
        );
      } else {
        return (
          <div class="play-left" onClick={openPlayPage}>
            {" "}
          </div>
        );
      }
    };

    return () => {
      const { modelValue } = props;
      return (
        <>
          <div
            class="play-box-empty"
            style={{
              display: modelValue ? "block" : "none",
            }}
          >
            <div
              class="play-box-area"
              style={{
                display: modelValue ? "block" : "none",
              }}
            >
              {store.state.playList[store.state.playCurrentIndex] ? (
                <audio
                  src={`https://music.163.com/song/media/outer/url?id=${
                    store.state.playList[store.state.playCurrentIndex].id
                  }.mp3`}
                  ref={playControRef}
                  autoplay={playing.value ? true : false}
                  onEnded={playEnd}
                  onPlay={onPlay}
                  onPause={onPause}
                  onTimeupdate={onTimeupdate}
                  loop={playLoop.value}
                  onError={onError}
                ></audio>
              ) : null}

              <div class="play-box">
                {renderImg()}
                <div class="play-center">
                  <div class="music-name">
                    <span>
                      {store.state.playList[store.state.playCurrentIndex]
                        ? store.state.playList[store.state.playCurrentIndex]
                            .name
                        : "还未播放歌曲"}
                    </span>
                  </div>
                  <div class="music-author">
                    {store.state.playList[store.state.playCurrentIndex]
                      ? store.state.playList[store.state.playCurrentIndex].ar[0]
                          .name
                      : "请先选择歌曲哦"}
                  </div>
                </div>
                <div class="play-right">
                  <div class="play-btn" onClick={changePlayStatu}>
                    <Progress
                      percentage={playPercentage.value}
                      showText={true}
                      width="0.7rem"
                      strokeWidth="2"
                      baseColor={store.state.dark ? "#313131" : "#E5E5E5"}
                      color={store.state.dark ? "#fff" : "#000"}
                      v-slots={{
                        center: () => (
                          <>
                            <i
                              class={[
                                "iconfont",
                                playing.value ? "icon-puesed" : "icon-play",
                              ]}
                            ></i>
                          </>
                        ),
                      }}
                    />
                  </div>
                  <div class="play-list" onClick={openRedyList}>
                    <i class="iconfont icon-bofangliebiao"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RedyPlayList
            popVisible={popVisible.value}
            onClose={closeRedyList}
            playList={store.state.playList}
            currentIndex={store.state.playCurrentIndex}
          />
          <PlayMusicPage
            musicData={
              store.state.playList[store.state.playCurrentIndex]
                ? store.state.playList[store.state.playCurrentIndex]
                : null
            }
            visible={playPageVisible.value}
            onClose={closePlayPage}
            playing={playing.value}
            bufferTime={playBufferTime.value}
            onChangePlaying={changePlayStatu}
            onPlayReadList={openRedyList}
            onChangePlaytime={changeMusicTime}
          />
        </>
      );
    };
  },
});
