import { defineComponent, nextTick, ref, Transition, watch } from "vue";
import "./search.scss";

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
    const placeholder = ref("搜索音乐、视频、播客、歌词");
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

    watch(
      () => props.visible,
      (newValue) => {
        if (newValue) {
          nextTick(() => {
            inputRef.value.focus();
          });
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
                  <div class="history-body-card">历史1</div>
                  <div class="history-body-card">历史2</div>
                  <div class="history-body-card">历史3</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                  <div class="history-body-card">历史4</div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      );
    };
  },
});
