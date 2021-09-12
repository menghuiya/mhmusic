import { defineComponent, PropType, CSSProperties, ref } from "vue";
import Popup from "../Popup/Popup";
import "./index.scss";
import { ClickEventFuncType } from "@/utils/types";
import { isFunction } from "@/utils";

export type ConfirmAction = "confirm" | "cancel";
export type ConfirmMessage = string | (() => JSX.Element);
export type ConfirmMessageAlign = "left" | "center" | "right";

export default defineComponent({
  name: "Confirm",
  props: {
    callback: Function as PropType<(action?: ConfirmAction) => void>,
    modelValue: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "标题",
    },
    width: [Number, String],
    allowHtml: {
      type: Boolean,
      default: false,
    },
    message: [String, Function] as PropType<ConfirmMessage>,
    messageAlign: String as PropType<ConfirmMessageAlign>,
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    confirmButtonText: {
      type: String,
      default: "确认",
    },
    cancelButtonColor: String,
    confirmButtonColor: String,
  },
  emits: ["confirm", "cancel", "update:modelValue"],
  setup(props, { emit, slots }) {
    const updateShow = (value: boolean) => emit("update:modelValue", value);

    const close = (action: ConfirmAction) => {
      updateShow(false);
      if (props.callback) {
        props.callback(action);
      }
    };

    const getActionHandler = (action: ConfirmAction) => () => {
      // should not trigger close event when hidden
      if (!props.modelValue) {
        return;
      }
      emit(action);
      close(action);
    };

    const onCancel = getActionHandler("cancel");
    const onConfirm = getActionHandler("confirm");

    const popStyle = ref<CSSProperties>({
      width: "6.5rem",
      borderRadius: "0.35rem",
      overflow: "hidden",
      backgroundColor: "#F1F0F0",
      textAlign: "center",
    });

    const renderMessage = () => {
      const { message, allowHtml } = props;
      const content = isFunction(message) ? message() : message;
      return content;
    };

    return () => {
      const {
        modelValue,
        title,
        cancelButtonText,
        confirmButtonText,
        showCancelButton,
        showConfirmButton,
        cancelButtonColor,
        confirmButtonColor,
        messageAlign,
        width,
      } = props;
      return (
        <div>
          <Popup
            clickModalClose={false}
            showSafeArea={false}
            visible={modelValue}
            direction="center"
            style={popStyle.value}
            mIndex={200}
            {...{ "onUpdate:modelValue": updateShow }}
            v-slots={{
              head: () => null,
            }}
          >
            <div
              class="comfirm"
              style={{
                width: width,
              }}
            >
              <div class="comfirm-title">{title}</div>
              <div
                class="comfirm-message"
                style={{
                  textAlign: messageAlign,
                }}
              >
                {renderMessage()}
              </div>
              <div class="comfirm-action">
                {showCancelButton ? (
                  <div
                    class="comfirm-action-cancle"
                    onClick={onCancel}
                    style={{
                      color: cancelButtonColor,
                    }}
                  >
                    {cancelButtonText}
                  </div>
                ) : null}
                {showConfirmButton ? (
                  <div
                    class="comfirm-action-comfirm"
                    onClick={onConfirm}
                    style={{
                      color: confirmButtonColor,
                    }}
                  >
                    {confirmButtonText}
                  </div>
                ) : null}
              </div>
            </div>
          </Popup>
        </div>
      );
    };
  },
});
