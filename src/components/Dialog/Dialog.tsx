import { defineComponent, ref, watch } from "vue";
import "./index.scss";

import Modal from "@/components/Modal/Modal";

export default defineComponent({
  name: "Dialog",
  components: {
    Modal,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "50%",
    },
    height: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "15vh",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const modalStatu = ref(true);
    const modalClick = () => {
      console.log("触发了吗s1");
      modalStatu.value = false;
      emit("close");
    };
    const closeBtnClick = () => {
      modalStatu.value = false;
      emit("close");
    };
    watch(
      () => props.visible,
      (newProps) => {
        if (newProps) {
          modalStatu.value = true;
        }
      }
    );

    const renderDialog = () => {
      if (props.visible) {
        return (
          <div class="dialog-box">
            <Modal
              mIndex={101}
              isOpen={modalStatu.value}
              onCloseModal={modalClick}
            />

            <div
              class="dialog"
              style={{
                width: props.width,
                marginTop: props.top,
              }}
            >
              <div class="dialog-head">
                <div class="dialog-title">{props.title}</div>
                <div class="dialog-close" onClick={closeBtnClick}>
                  {/* <i class="iconfont icon-"></i> */}
                  关闭
                </div>
              </div>
              <div class="dialog-body">
                {slots.default ? slots.default!() : null}
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    return () => {
      return renderDialog();
    };
  },
});
