import { useStore } from "vuex";
import { defineComponent, onMounted, ref, watch } from "vue";
import "./index.scss";

import RedyPlayList from "./RedyPlayList";
import PlayMusicPage from "./PlayMusicPage";

export default defineComponent({
  name: "PlayController",
  props: {},
  setup() {
    const store = useStore();
    const playing = ref(false);
    const popVisible = ref(false);
    const playPageVisible = ref(false);
    const playControRef = ref();

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
      playing.value = true;
    };

    const onPause = () => {
      playing.value = false;
    };

    const onTimeupdate = () => {
      const timeDisplay = playControRef.value.currentTime; //获取实时时间
      // const min = t
      // console.log(timeDisplay);
      store.commit("setPlayCurrentTime", timeDisplay);
    };

    watch(
      () => store.state.playCurrentIndex,
      (newValue, oldValue) => {
        // console.log(newValue, oldValue);
        if (!playing.value) {
          playing.value = true;
          // playControRef.value.play();
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
      return (
        <>
          <div class="play-box-empty">
            <div class="play-box-area">
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
                    <i
                      class={[
                        "iconfont",
                        playing.value ? "icon-bofang1" : "icon-bofang",
                      ]}
                    ></i>
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
            onChangePlaying={changePlayStatu}
            onPlayReadList={openRedyList}
          />
        </>
      );
    };
  },
});
