import { CustomEventFuncType } from "@/utils/types";
import { defineComponent, ref, watch } from "vue";
import "./index.scss";

export default defineComponent({
  name: "Progress",
  props: {
    type: {
      type: String,
      default: "circle",
    },
    percentage: {
      type: [Number, String],
      default: 0,
      des: "百分比",
    },
    width: {
      type: [Number, String],
      default: "126px",
      des: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）",
    },
    strokeWidth: {
      type: [Number, String],
      default: 4.8,
      des: "进度条宽度",
    },
    color: {
      type: [String, Array, Function], // [String, Array, Function],
      default: "#20a0ff",
      des: "进度条背景色",
    },
    baseColor: {
      type: String,
      default: "#e5e9f2",
    },
    showText: Boolean,
    format: Function as CustomEventFuncType<number | string>,
  },
  setup(props, { emit, slots }) {
    const formatText = ref();
    const strokeDasharrayLeft = ref(0);
    const strokeDasharrayRight = 295.31;
    const dashboardLeft = 221.482;
    const realColor = ref("");

    const computeDasharrayLeft = (num: number | string) => {
      const { type } = props;
      const rate = Number(num);
      if (type === "dashboard") {
        strokeDasharrayLeft.value = (dashboardLeft * rate) / 100;
      } else {
        strokeDasharrayLeft.value = (strokeDasharrayRight * rate) / 100;
      }
    };

    const compoteColor = (num: number | string) => {
      const { color } = props;
      const rate = Number(num);

      if (typeof color === "string") {
        realColor.value = color;
        return;
      }
      if (typeof color === "function") {
        realColor.value = color(Number(num));
        return;
      }
      if (Array.isArray(color)) {
        const colorMap: any = color.find((item: any) => {
          const colorRate = Number(item.percentage);
          return colorRate >= rate;
        });
        if (colorMap !== undefined) {
          realColor.value = colorMap.color;
        }
        return;
      }
    };

    watch(
      () => [props.percentage, props.format],
      () => {
        if (props.format) {
          formatText.value = props.format(props.percentage);
        }
        computeDasharrayLeft(props.percentage);
        compoteColor(props.percentage);
      },
      { immediate: true }
    );

    const renderDashboard = (): JSX.Element | null => {
      const { type, strokeWidth, baseColor } = props;

      return type === "dashboard" ? (
        <svg viewBox="0 0 100 100">
          <path
            d="M 50 50 m 0 47 a 47 47 0 1 1 0 -94 a 47 47 0 1 1 0 94"
            stroke={baseColor}
            stroke-width={strokeWidth}
            fill="none"
            style={{
              strokeDasharray: `${dashboardLeft}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "-36.9137px",
            }}
          ></path>
          <path
            d="M 50 50 m 0 47 a 47 47 0 1 1 0 -94 a 47 47 0 1 1 0 94"
            stroke={realColor.value}
            fill="none"
            stroke-linecap="round"
            stroke-width={strokeWidth}
            class="progress-process"
            style={{
              strokeDasharray: `${strokeDasharrayLeft.value}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "-36.9137px",
            }}
          ></path>
        </svg>
      ) : null;
    };
    const renderCircle = (): JSX.Element | null => {
      const { type, strokeWidth, baseColor } = props;
      return type === "circle" ? (
        <svg viewBox="0 0 100 100">
          <path
            d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
            stroke={baseColor}
            stroke-width={strokeWidth}
            fill="none"
            style={{
              strokeDasharray: `${strokeDasharrayRight}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "0px",
            }}
          ></path>
          <path
            d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
            stroke={realColor.value}
            fill="none"
            stroke-linecap="round"
            stroke-width={strokeWidth}
            class="progress-process"
            style={{
              strokeDasharray: `${strokeDasharrayLeft.value}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "0px",
            }}
          ></path>
        </svg>
      ) : null;
    };
    return () => {
      const { percentage, format, showText, width } = props;
      return (
        <div
          class="progress"
          style={{
            width: width,
            height: width,
          }}
        >
          {renderDashboard()}
          {renderCircle()}
          {showText ? (
            <div class="progress-data-center">
              {slots.center
                ? slots.center()
                : format
                ? formatText.value
                : percentage}
            </div>
          ) : null}
        </div>
      );
    };
  },
});
