import { ClickEventFuncType } from "@/utils/types";
import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
} from "vue";
import "./index.scss";

export default defineComponent({
  name: "SliderNav",
  props: {
    sliderData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    currentSliderId: {
      type: Number,
      defaultl: 0,
    },
  },
  emits: ["change"],
  setup(props, { emit, slots }) {
    const sliderNavRef = ref();
    const sliderNavId = ref(0);
    const navUnderlinStyle = ref<CSSProperties>({});

    const handleNavItem: ClickEventFuncType = (item) => (e) => {
      e.preventDefault();
      sliderNavId.value = item.id;
    };

    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };

    onMounted(() => {
      nextTick(() => {
        const navActive: any = document.querySelector(".slider-nav-active");
        moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
      });
      //这里准备把切换事件发射出去
    });

    watch(
      () => sliderNavId.value,
      (value) => {
        nextTick(() => {
          const navActive: any = document.querySelector(".slider-nav-active");
          const navWidth = sliderNavRef.value.offsetWidth;
          if (navActive) {
            const navOffsetWidth = navActive.offsetLeft;
            const diffWidth = (navWidth - navActive.offsetWidth) / 2; //中间值
            const targetWidth = navOffsetWidth - diffWidth;
            sliderNavRef.value.scrollLeft = targetWidth;
            moveUnderLine(navActive.offsetWidth, navOffsetWidth);
          }
        });
        //这里准备把切换事件发射出去
        emit("change", value);
      }
    );

    watch(
      () => props.currentSliderId,
      (newvalue) => {
        if (typeof newvalue === "number") {
          sliderNavId.value = newvalue;
        }
      }
    );

    return () => {
      const { sliderData } = props;
      return (
        <div class="slider-nav" ref={sliderNavRef}>
          <div class="slider-nav-box">
            {sliderData.map((item: any) => {
              return (
                <div
                  class={[
                    "slider-nav-item",
                    sliderNavId.value === item.id ? "slider-nav-active" : "",
                  ]}
                  onClick={handleNavItem(item)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <i class="slider-nav-underline" style={navUnderlinStyle.value}></i>
        </div>
      );
    };
  },
});
