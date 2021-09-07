import { defineComponent, PropType } from "vue";
import Popup from "../Popup/Popup";

type DialogAction = "confirm" | "cancel";

export default defineComponent({
  name: "Comfirm",
  props: {
    callback: Function as PropType<(action?: DialogAction) => void>,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["confirm", "cancel", "update:visible"],
  setup(props, { emit, slots }) {
    const updateShow = (value: boolean) => emit("update:visible", value);

    const close = (action: DialogAction) => {
      updateShow(false);

      if (props.callback) {
        props.callback(action);
      }
    };
    return () => {
      return (
        <div>
          <Popup
            visible={props.visible}
            onClose={close}
            direction="center"
            style={{ padding: "30px 50px" }}
            {...{ "onUpdate:visible": updateShow }}
          >
            江哈斯发
          </Popup>
        </div>
      );
    };
  },
});
