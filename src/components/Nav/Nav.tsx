import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
} from "vue";
import "./index.scss";
import router from "@/router";
import { imgToBlob } from "@/utils/tool";
import { CustomEventFuncType } from "@/utils/types";

export default defineComponent({
  name: "Nav",
  props: {
    leftIcon: {
      type: String,
      default: "icon-fanhui1",
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
    iconSize: {
      type: String,
      default: "0.5rem",
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
    overflowHeight: Number,
    style: Object as PropType<CSSProperties>,
    onLeftClick: Function as CustomEventFuncType<null>,
    onRightClick: Function as CustomEventFuncType<null>,
  },
  emits: ["left-click", "right-click", "moreNav", "lessNav", "scroll"],
  setup(props, { emit, slots }) {
    const handleLeftClick = () => {
      if (props.backStatus) {
        router.go(-1);
      } else {
        emit("left-click");
      }
    };
    const handleRightClick = () => {
      emit("right-click");
    };
    const renderLeft = () => {
      const { iconColor, iconSize } = props;

      return slots.left ? (
        slots.left()
      ) : (
        <i
          class={["iconfont", props.leftIcon]}
          onClick={handleLeftClick}
          style={{
            color: iconColor,
            fontSize: iconSize,
          }}
        ></i>
      );
    };
    const offsetHeight = ref(0);
    const isFixed = ref<boolean>(false);
    const NavRef = ref();
    const appContent: any = document.querySelector(".app-content");
    const backgroundStyle = ref<CSSProperties>({
      backgroundImage: "",
    });
    const initHeight = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        appContent.scrollTop;
      let moreThanHeight = offsetHeight.value;
      emit("scroll", scrollTop);
      if (props.overflowHeight && props.overflowHeight > 0) {
        moreThanHeight = props.overflowHeight - offsetHeight.value;
      }
      if (scrollTop > moreThanHeight) {
        if (!isFixed.value) {
          isFixed.value = true;
          // NavRef.value.style.backgroundImage = `url('${props.bgImg}')`;
          // NavRef.value.style.cssText = `background-image:url('${props.bgImg}') !important`;
          backgroundStyle.value.backgroundImage = `url('${props.bgImg}') !important`;
          emit("moreNav");
        }
      } else {
        if (isFixed.value) {
          isFixed.value = false;
          // NavRef.value.style.backgroundImage = ``;
          backgroundStyle.value.backgroundImage = ``;
          emit("lessNav");
        }
      }
    };

    onMounted(() => {
      nextTick(() => {
        appContent.addEventListener("scroll", initHeight);
        offsetHeight.value = NavRef.value.offsetHeight;
      });
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", initHeight);
    });

    const renderRight = () => {
      const { iconColor, iconSize } = props;
      return slots.right ? (
        slots.right()
      ) : (
        <i
          class={["iconfont", props.rightIcon]}
          onClick={handleRightClick}
          style={{
            color: iconColor,
            fontSize: iconSize,
          }}
        ></i>
      );
    };
    return () => {
      return (
        <div
          class={["top-nav", isFixed.value ? "nav-fixed" : ""]}
          ref={NavRef}
          style={{ ...backgroundStyle.value, ...props.style }}
        >
          <div class="top-left">{renderLeft()}</div>
          <div class="top-center">{slots.center ? slots.center() : null}</div>
          <div class="top-right">{renderRight()}</div>
        </div>
      );
    };
  },
});
