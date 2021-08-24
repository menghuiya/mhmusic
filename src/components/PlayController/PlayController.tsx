import { useStore } from "vuex";
import { computed, defineComponent, reactive, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "PlayController",
  props: {},
  setup(props, { emit, slots }) {
    const store = useStore();
    const playing = ref(false);
    const changePlayStatu = () => {
      playing.value = !playing.value;
    };

    // const playLit = computed(() => {
    //   console.log(store.state.playLit);
    //   return store.state.playLit;
    // });
    // const playCurrentIndex = computed(() => {
    //   return store.state.playCurrentIndex;
    // });
    const state = reactive({
      playLit: store.state.playLit,
      playCurrentIndex: store.state.playCurrentIndex,
    });
    const renderImg = () => {
      if (
        store.state.playLit[store.state.playCurrentIndex] &&
        store.state.playLit[store.state.playCurrentIndex].al
      ) {
        return (
          <img
            src={store.state.playLit[store.state.playCurrentIndex].al.picUrl}
            class="play-left"
            alt="播放图片"
          />
        );
      } else {
        return <div class="play-left"> </div>;
      }
    };
    return () => {
      return (
        <div class="play-box-area">
          <div class="play-box">
            {renderImg()}
            <div class="play-center">
              <div class="music-name">
                <marquee behavior="" direction="">
                  <span>
                    {store.state.playLit[store.state.playCurrentIndex]
                      ? store.state.playLit[store.state.playCurrentIndex].name
                      : "还未播放歌曲"}
                  </span>
                </marquee>
              </div>
              <div class="music-author">
                {store.state.playLit[store.state.playCurrentIndex]
                  ? store.state.playLit[store.state.playCurrentIndex].ar[0].name
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
              <div class="play-list">
                <i class="iconfont icon-bofangliebiao"></i>
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
