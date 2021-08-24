import { defineComponent, nextTick, onMounted, onUnmounted, ref } from "vue";
import "./index.scss";
import router from "@/router";
import { imgToBlob } from "@/utils/tool";

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
    bgImg: {
      type: String,
      default: "",
      desc: "作为背景使用",
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
    const offsetHeight = ref(0);
    const isFixed = ref<boolean>(false);
    const NavRef = ref();
    const initHeight = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > offsetHeight.value) {
        isFixed.value = true;
        NavRef.value.style.backgroundImage = `url('${props.bgImg}')`;
      } else {
        isFixed.value = false;
        NavRef.value.style.backgroundImage = ``;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", initHeight);
      nextTick(() => {
        offsetHeight.value = NavRef.value.offsetHeight;
      });
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", initHeight);
    });

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
        <div class={["top-nav", isFixed.value ? "nav-fixed" : ""]} ref={NavRef}>
          <div class="top-left">{renderLeft()}</div>
          <div class="top-center">{slots.center ? slots.center() : null}</div>
          <div class="top-right">{renderRight()}</div>
        </div>
      );
    };
  },
});
