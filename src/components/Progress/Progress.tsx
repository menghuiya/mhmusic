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
      type: Number,
      default: 0,
      des: "百分比",
    },
    width: {
      type: Number,
      default: 126,
      des: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） ",
    },
    strokeWidth: {
      type: Number,
      default: 4.8,
      des: "进度条宽度",
    },
    color: {
      type: [String, Array, Function],
      default: "red",
      des: "进度条背景色",
    },
    showText: Boolean,
    format: Function as CustomEventFuncType<number>,
  },
  setup(props, { emit }) {
    // const format = ref();
    watch(
      () => props.showText,
      () => {
        console.log("props.showText", props.showText);
      },
      { immediate: true }
    );

    return () => {
      // const { width, percentage } = props;
      return (
        <div>
          <span>{props.percentage}</span>---
          <span>{props.type}</span>
        </div>
      );
    };
  },
});
