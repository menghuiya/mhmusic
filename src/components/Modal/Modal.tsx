import { defineComponent, Transition } from "vue";
import "./index.scss";

import { CustomEventFuncType } from "@/utils/types";
export default defineComponent({
  name: "Modal",
  props: {
    mIndex: {
      type: Number,
      default: 1,
    },
    show: {
      type: Boolean,
      default: false,
    },
    opacity: {
      type: Number,
      default: 1,
    },
    lockScroll: Boolean,
    onClickModal: Function as CustomEventFuncType<null>,
  },
  emits: ["click-modal"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click-modal");
    };
    const preventTouchMove = (event: TouchEvent) => {
      if (props.lockScroll) {
        event.preventDefault();
      }
    };
    const renderModal = () => {
      const { mIndex, show, opacity } = props;
      return (
        <div
          class="mh-modal"
          style={{
            zIndex: mIndex,
            opacity: opacity,
          }}
          v-show={show}
          onClick={handleClick}
          onTouchmove={preventTouchMove}
        ></div>
      );
    };
    return () => {
      const { opacity } = props;
      return (
        <Transition name={opacity === 0 ? "" : "modal-fade"}>
          {renderModal()}
        </Transition>
      );
    };
  },
});
