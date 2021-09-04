import { defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  name: "LoadingCom",
  props: {
    loadType: {
      type: String,
      default: "small",
    },
    loadTitle: {
      type: String,
      default: "正在加载...",
    },
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div>
          <div class="load-small">
            <div class="k-line k-line1-1"></div>
            <div class="k-line k-line1-2"></div>
            <div class="k-line k-line1-3"></div>
            <div class="k-line k-line1-4"></div>
          </div>
          <div class="k-title">{props.loadTitle}</div>
        </div>
      );
    };
  },
});
