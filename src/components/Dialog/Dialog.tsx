import { defineComponent, ref, Transition, watch } from "vue";
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
    const modalStatu = ref(false);
    const modalClick = () => {
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
        modalStatu.value = newProps;
      }
    );
    Transition;
    const renderDialog = () => {
      return (
        <div class="dialog-box" v-show={props.visible}>
          <Transition name="dialog-fade">
            <div
              class="dialog"
              style={{
                width: props.width,
                marginTop: props.top,
              }}
              v-show={props.visible}
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
          </Transition>
        </div>
      );
    };
    return () => {
      return (
        <>
          <Modal
            mIndex={101}
            show={modalStatu.value}
            onClickModal={modalClick}
          />
          {renderDialog()}
        </>
      );
    };
  },
});
