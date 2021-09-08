import { defineComponent, PropType, CSSProperties, ref } from "vue";
import Popup from "../Popup/Popup";
import "./index.scss";
import { ClickEventFuncType } from "@/utils/types";

type DialogAction = "confirm" | "cancel";

export default defineComponent({
  name: "Comfirm",
  props: {
    callback: Function as PropType<(action?: DialogAction) => void>,
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["confirm", "cancel", "update:modelValue"],
  setup(props, { emit, slots }) {
    const updateShow = (value: boolean) => emit("update:modelValue", value);

    const close = (action: DialogAction) => {
      updateShow(false);
      if (props.callback) {
        props.callback(action);
      }
    };

    const getActionHandler = (action: DialogAction) => () => {
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
      const { modelValue } = props;
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
              <div class="comfirm-title">梦回云音乐</div>
              <div class="comfirm-message">确定退出当前账号吗？</div>
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
