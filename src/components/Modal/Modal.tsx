import { defineComponent, PropType, Teleport, Transition } from "vue";
import "./index.scss";
type CustomEventFuncType<T> = PropType<(arg: T) => void>;
export default defineComponent({
  name: "Dialog",
  props: {
    mIndex: {
      type: Number,
      default: 1,
    },
    show: {
      type: Boolean,
      default: false,
    },
    onClickModal: Function as CustomEventFuncType<null>,
  },
  emits: ["click-modal"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click-modal");
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
        ></div>
      );
    };
    return () => {
      return <Transition name="modal-fade">{renderModal()}</Transition>;
    };
  },
});
