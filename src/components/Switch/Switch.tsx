import { defineComponent, watch } from "vue";
import "./index.scss";

export default defineComponent({
  name: "Switch",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "1.2rem",
      des: "switch 的宽度",
    },
    activeColor: {
      type: String,
      default: "#409EFF",
      des: "switch 打开时的背景色",
    },
    inactiveColor: {
      type: String,
      default: "#fff",
      des: "switch 关闭时的背景色",
    },
    size: {
      type: [String, Number],
      default: "0.6rem",
      des: "切换球 的宽度",
    },

    disable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const updateShow = (value: boolean) => emit("update:modelValue", value);
    const handleClick = () => {
      if (props.disable) {
        return false;
      }
      updateShow(!props.modelValue);
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        emit("change", newValue);
      }
    );

    return () => {
      const {
        modelValue,
        width,
        activeColor,
        inactiveColor,
        disable,
        size,
      } = props;
      return (
        <div
          class={["switch", disable ? "disable" : ""]}
          style={{
            background: modelValue ? activeColor : inactiveColor,
            width: width,
          }}
          onClick={handleClick}
        >
          <div
            class="switch-dot"
            style={{
              width: size,
              height: size,
              left: modelValue ? "calc(100% - 0.6rem)" : "0",
            }}
          ></div>
        </div>
      );
    };
  },
});
