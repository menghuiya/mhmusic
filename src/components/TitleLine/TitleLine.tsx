import { defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  name: "TitleLine",
  props: {
    showType: {
      type: String,
      default: "right",
    },
    title: {
      type: String,
      default: "推荐歌单",
    },
    btnName: {
      type: String,
      default: "更多",
    },
  },
  setup(props, { emit, slots }) {
    const renderFresh = () => {
      if (props.showType === "left") {
        return <i class="iconfont icon-shuaxin1"></i>;
      }
      return null;
    };
    const renderMore = () => {
      if (props.showType === "right") {
        return <i class="iconfont icon-qianjin1"></i>;
      }
      return null;
    };
    return () => {
      return (
        <div class="title-box">
          <div class="title-title">{props.title}</div>
          <div class="more-card">
            {renderFresh()}
            <div class="more-title">{props.btnName}</div>
            {renderMore()}
          </div>
        </div>
      );
    };
  },
});
