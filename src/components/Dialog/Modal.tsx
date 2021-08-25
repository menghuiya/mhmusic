import { defineComponent, Teleport } from "vue";
import "./index.scss";

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
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("closeModal");
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
