import { defineComponent, PropType, Teleport } from "vue";
import "./index.scss";
type CustomEventFuncType<T> = PropType<(arg: T) => void>;
export default defineComponent({
  name: "Dialog",
  props: {
    mIndex: {
      type: Number,
      default: 1,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    onCloseModal: Function as CustomEventFuncType<null>,
  },
  emits: ["close-modal"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("close-modal");
    };
    const renderModal = () => {
      return props.isOpen ? (
        <div
          class="mh-modal"
          style={{ zIndex: props.mIndex }}
          onClick={handleClick}
        ></div>
      ) : null;
    };
    return () => {
      return <Teleport to="#modal">{renderModal()}</Teleport>;
    };
  },
});
