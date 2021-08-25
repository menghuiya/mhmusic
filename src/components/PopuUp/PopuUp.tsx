import { defineComponent, reactive, ref, watch } from "vue";
import "./index.scss";

import Modal from "@/components/Modal/Modal";
export default defineComponent({
  name: "PopuUp",
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
    direction: {
      validator: (value: string) => {
        return ["bottom", "left", "right", "top"].includes(value);
      },
      default: "bottom",
    },
    height: {
      type: String,
      default: "30%",
    },
    width: {
      type: String,
      default: "30%",
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const modalStatu = ref(false);
    const modalClick = () => {
      console.log("触发了吗1", modalStatu.value);

      emit("close");
      setTimeout(() => {
        modalStatu.value = false;
      }, 300);
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
    const renderPop = () => {
      return (
        <div>
          <Modal
            mIndex={101}
            isOpen={modalStatu.value}
            onCloseModal={modalClick}
          />
          <div
            class={["pop", "pop-" + props.direction]}
            style={{
              // height: props.visible ? props.height : 0,
              width: props.visible ? props.width : 0,
              // display: props.visible ? "" : "none",
              zIndex: 888,
            }}
          >
            1212
          </div>
        </div>
      );
    };
    return () => {
      return renderPop();
    };
  },
});
