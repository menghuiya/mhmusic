import { CSSProperties, defineComponent, PropType } from "vue";
import "./index.scss";

export default defineComponent({
  name: "TitleLine",
  props: {
    showType: {
      type: String,
      default: "right",
    },
    icon: {
      type: String,
      default: "icon-qianjin1",
    },
    title: {
      type: String,
      default: "推荐歌单",
    },
    btnName: {
      type: String,
      default: "更多",
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    titleStyle: {
      type: Object as PropType<CSSProperties>,
    },
    showLeft: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit, slots }) {
    const renderFresh = () => {
      if (props.showType === "left") {
        return props.icon ? <i class={["iconfont", props.icon]}></i> : null;
      }
      return null;
    };
    const renderMore = () => {
      if (props.showType === "right") {
        return props.icon ? <i class={["iconfont", props.icon]}></i> : null;
      }
      return null;
    };
    return () => {
      return (
        <div
          class="title-box"
          style={{
            padding: props.noPadding ? "0 0" : "",
          }}
        >
          <div class="title-title" style={props.titleStyle}>
            {props.title}
          </div>
          <div class="more-card" v-show={props.showLeft}>
            {renderFresh()}
            <div class="more-title">{props.btnName}</div>
            {renderMore()}
          </div>
        </div>
      );
    };
  },
});
