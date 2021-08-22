import { defineComponent } from "vue";
import "./index.scss";
import router from "@/router";

export default defineComponent({
  name: "Nav",
  props: {
    leftIcon: {
      type: String,
      default: "icon-fanhui",
      desc: "定义left插槽时此prop失效",
    },
    rightIcon: {
      type: String,
      default: "icon-gengduo",
      desc: "定义right插槽时此prop失效",
    },
    iconColor: {
      type: String,
      default: "#000",
      desc: "定义right插槽时此prop失效",
    },
    backStatus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["leftClick", "rightClick"],
  setup(props, { emit, slots }) {
    const handleLeftClick = () => {
      if (props.backStatus) {
        router.go(-1);
      } else {
        emit("leftClick");
      }
    };
    const handleRightClick = () => {
      emit("rightClick");
    };
    const renderLeft = () => {
      return slots.left ? (
        slots.left()
      ) : (
        <i
          class={["iconfont", props.leftIcon]}
          onClick={handleLeftClick}
          style={`color:${props.iconColor}`}
        ></i>
      );
    };
    const renderRight = () => {
      return slots.right ? (
        slots.right()
      ) : (
        <i
          class={["iconfont", props.rightIcon]}
          onClick={handleRightClick}
          style={`color:${props.iconColor}`}
        ></i>
      );
    };
    return () => {
      return (
        <div class="top-nav">
          <div class="top-left">{renderLeft()}</div>
          <div class="top-center">{slots.center ? slots.center() : null}</div>
          <div class="top-right">{renderRight()}</div>
        </div>
      );
    };
  },
});
