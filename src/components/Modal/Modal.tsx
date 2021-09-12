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
      return (
        <div
          class="mh-modal"
          style={{
            zIndex: props.mIndex,
          }}
          v-show={props.show}
          onClick={handleClick}
          onTouchmove={preventTouchMove}
        ></div>
      );
    };
    return () => {
      return <Transition name="modal-fade">{renderModal()}</Transition>;
    };
  },
});
