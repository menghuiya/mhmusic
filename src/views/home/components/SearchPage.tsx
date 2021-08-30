import { defineComponent, Transition } from "vue";
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
    const closeSearch = () => {
      emit("close");
    };
    return () => {
      return (
        <Transition name="search-fade">
          <div class="search" v-show={props.visible}>
            <div class="search-head">
              <div class="search-head-box">
                <i class="iocnfont icon-sousuo"></i>
                <input
                  class="search-head-input"
                  type="text"
                  placeholder="搜索音乐、视频、播客、歌词"
                />
              </div>
              <div class="search-head-cancel" onClick={closeSearch}>
                取消
              </div>
            </div>
            <div class="search-body">我是身体部分的呀</div>
          </div>
        </Transition>
      );
    };
  },
});
