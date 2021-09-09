import { defineComponent, PropType, CSSProperties, ref } from "vue";
import Popup from "../Popup/Popup";
import "./index.scss";
import { ClickEventFuncType } from "@/utils/types";

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
    title: String,
    width: [Number, String],
    message: [String, Function] as PropType<ConfirmMessage>,
    messageAlign: String as PropType<ConfirmMessageAlign>,
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

    return () => {
      const { modelValue, title, message } = props;
      return (
        <div>
          <Popup
            clickModalClose={false}
            showSafeArea={false}
            visible={modelValue}
            direction="center"
            style={popStyle.value}
            {...{ "onUpdate:modelValue": updateShow }}
            v-slots={{
              head: () => null,
            }}
          >
            <div class="comfirm">
              <div class="comfirm-title">{title}</div>
              <div class="comfirm-message">{message}</div>
              <div class="comfirm-action">
                <div class="comfirm-action-cancle" onClick={onCancel}>
                  取消
                </div>
                <div class="comfirm-action-comfirm" onClick={onConfirm}>
                  确定
                </div>
              </div>
            </div>
          </Popup>
        </div>
      );
    };
  },
});
