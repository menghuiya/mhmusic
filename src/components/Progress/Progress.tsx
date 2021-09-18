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
      type: Number,
      default: 126,
      des: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）",
    },
    strokeWidth: {
      type: Number,
      default: 4.8,
      des: "进度条宽度",
    },
    color: {
      type: String, // [String, Array, Function],
      default: "red",
      des: "进度条背景色",
    },
    showText: Boolean,
    format: Function as CustomEventFuncType<number | string>,
  },
  setup(props, { emit, slots }) {
    const formatText = ref();
    const strokeDasharrayLeft = ref(0);
    const strokeDasharrayRight = 295.31;
    const dashboardLeft = 221.482;

    const computeDasharrayLeft = (num: number | string) => {
      const { type } = props;
      const rate = Number(num);
      if (type === "dashboard") {
        strokeDasharrayLeft.value = (dashboardLeft * rate) / 100;
      } else {
        strokeDasharrayLeft.value = (strokeDasharrayRight * rate) / 100;
      }
    };

    watch(
      () => [props.percentage, props.format],
      () => {
        if (props.format) {
          formatText.value = props.format(props.percentage);
        }
        computeDasharrayLeft(props.percentage);
      }
    );

    const renderDashboard = (): JSX.Element | null => {
      const { type } = props;
      return type === "dashboard" ? (
        <svg viewBox="0 0 100 100">
          <path
            d="M 50 50 m 0 47 a 47 47 0 1 1 0 -94 a 47 47 0 1 1 0 94"
            stroke="#e5e9f2"
            stroke-width="4.8"
            fill="none"
            style={{
              strokeDasharray: `${dashboardLeft}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "-36.9137px",
            }}
          ></path>
          <path
            d="M 50 50 m 0 47 a 47 47 0 1 1 0 -94 a 47 47 0 1 1 0 94"
            stroke="#e6a23c"
            fill="none"
            stroke-linecap="round"
            stroke-width="4.8"
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
      const { type } = props;
      return type === "circle" ? (
        <svg viewBox="0 0 100 100">
          <path
            d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
            stroke="#e5e9f2"
            stroke-width="4.8"
            fill="none"
            style={{
              strokeDasharray: `${strokeDasharrayRight}px, ${strokeDasharrayRight}px`,
              strokeDashoffset: "0px",
            }}
          ></path>
          <path
            d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94 "
            stroke="#20a0ff"
            fill="none"
            stroke-linecap="round"
            stroke-width="4.8"
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
      const { percentage, type, format, showText } = props;
      return (
        <div class="progress">
          {renderDashboard()}
          {renderCircle()}
          {showText ? (
            <div class="progress-data-center">
              {format ? formatText.value : percentage}
            </div>
          ) : null}
        </div>
      );
    };
  },
});
