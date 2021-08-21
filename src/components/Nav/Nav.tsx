import { defineComponent } from "vue";
import "./index.scss";

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
  },
  emits: ["leftClick", "rightClick"],
  setup(props, { emit, slots }) {
    const handleLeftClick = () => {
      emit("leftClick");
    };
    const handleRightClick = () => {
      emit("rightClick");
    };
    const renderLeft = () => {
      return slots.left ? (
        slots.left()
      ) : (
        <i class={["iconfont", props.leftIcon]} onClick={handleLeftClick}></i>
      );
    };
    const renderRight = () => {
      return slots.right ? (
        slots.right()
      ) : (
        <i class={["iconfont", props.rightIcon]} onClick={handleRightClick}></i>
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
