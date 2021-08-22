import { defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  name: "CellItem",
  props: {
    arrow: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: "",
      desc: "头部icon",
    },
    title: {
      type: String,
      default: "标题",
      desc: "标题",
    },
    value: {
      type: String,
      default: "值",
      desc: "显示的值",
    },
    iconColor: {
      type: String,
      default: "#000",
      desc: "icon颜色",
    },
    iconSize: {
      type: String,
      default: "0.5rem",
      desc: "icon颜色",
    },
  },
  setup(props, { emit, slots }) {
    const renderIcon = () => {
      //主要是用于插入图片等
      return slots.icon ? (
        slots.icon()
      ) : (
        <div class="left-icon">
          <i
            class={["iconfont", props.icon]}
            style={`color:${props.iconColor};font-size:${props.iconSize}`}
          ></i>
        </div>
      );
    };
    const renderTitle = () => {
      //主要用来音乐列表
      return slots.title ? (
        slots.title()
      ) : (
        <div class="cell-title">{props.title}</div>
      );
    };

    const renderRightValue = () => {
      //主要用来音乐列表
      return slots.right ? (
        slots.right()
      ) : (
        <div class="cell-value">{props.value}</div>
      );
    };

    const renderArrow = () => {
      //是否显示arrow
      return props.arrow ? (
        <div class="right-icon">
          <i class="iconfont icon-qianjin1"></i>
        </div>
      ) : null;
    };

    return () => {
      return (
        <div class="cell-box">
          <div class="cell-left">
            {renderIcon()}
            {renderTitle()}
          </div>
          <div class="cell-right">
            {renderRightValue()}
            {renderArrow()}
          </div>
        </div>
      );
    };
  },
});
