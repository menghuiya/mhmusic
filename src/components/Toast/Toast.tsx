import { CSSProperties, defineComponent, PropType, ref, watch } from "vue";
import Popup from "../Popup/Popup";
import "./index.scss";

export type ToastType =
  | "text"
  | "loading"
  | "success"
  | "fail"
  | "html"
  | "onlyicon";
export type ToastPosition = "top" | "center" | "bottom";

export default defineComponent({
  name: "Toast",
  props: {
    icon: String,
    modelValue: {
      type: Boolean,
      default: false,
    },
    message: [Number, String],
    iconSize: [Number, String],
    closeOnClick: Boolean,
    type: {
      type: String as PropType<ToastType>,
      default: "text",
    },
    duration: {
      type: Number,
      default: 2000,
    },
    position: {
      type: String as PropType<ToastPosition>,
      default: "center",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    let timer: number | undefined = undefined;

    const updateShow = (value: boolean) => emit("update:modelValue", value);

    const popupClose = () => {
      updateShow(false);
    };

    const popStyle = ref<CSSProperties>({
      overflow: "hidden",
      backgroundColor: "transparent",
      textAlign: "center",
      top: props.position === "center" ? "40%" : undefined,
    });

    const clearTimer = () => clearTimeout(timer);

    watch(
      () => [props.modelValue, props.type, props.message, props.duration],
      () => {
        clearTimer();
        if (props.modelValue && props.duration > 0) {
          timer = setTimeout(() => {
            updateShow(false);
          }, props.duration);
        }
      }
    );

    const renderIcon = (): JSX.Element | null => {
      const { icon, type } = props;
      return icon && type !== "text" ? (
        <i class={["iconfont", icon, "toast-icon"]}></i>
      ) : null;
    };
    const renderMessage = (): JSX.Element | null => {
      const { message } = props;

      return message ? <div class="toast-message">{message}</div> : null;
    };

    return () => {
      const { modelValue, type } = props;
      return (
        <>
          <Popup
            clickModalClose={false}
            showSafeArea={false}
            visible={modelValue}
            direction="center"
            style={popStyle.value}
            opacity={0}
            mIndex={200}
            {...{ "onUpdate:modelValue": updateShow }}
            v-slots={{
              head: () => null,
            }}
            onClose={clearTimer}
          >
            <div class={["toast", "toast-" + type]}>
              {renderIcon()}
              {renderMessage()}
            </div>
          </Popup>
        </>
      );
    };
  },
});
