import { defineComponent, PropType, CSSProperties } from "vue";
import "./index.scss";

export default defineComponent({
  name: "CellItem",
  props: {
    arrow: {
      type: Boolean,
      default: true,
    },
    arrowIcon: {
      type: String,
      default: "icon-qianjin1",
      desc: "右侧icon",
    },
    icon: {
      type: String,
      default: "",
      desc: "头部icon",
    },
    title: {
      type: String,
      default: "标题",
      desc: "",
    },
    value: {
      type: String,
      default: "",
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
    arrowStyle: {
      type: Object as PropType<CSSProperties>,
    },
    titleStyle: {
      type: Object as PropType<CSSProperties>,
    },
  },
  emits: ["click"],
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
        <div class="cell-title" style={props.titleStyle}>
          {props.title}
        </div>
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
          <i class={["iconfont", props.arrowIcon]} style={props.arrowStyle}></i>
        </div>
      ) : null;
    };

    const onClick = () => {
      emit("click");
    };

    return () => {
      return (
        <div class="cell-box" onClick={onClick}>
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
