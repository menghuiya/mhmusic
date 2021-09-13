import {
  CSSProperties,
  defineComponent,
  PropType,
  reactive,
  ref,
  Transition,
  watch,
} from "vue";
import "./index.scss";

import Modal from "@/components/Modal/Modal";

export default defineComponent({
  name: "Popup",
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
        return ["bottom", "left", "right", "top", "center"].includes(value);
      },
      default: "",
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
    clickModalClose: {
      type: Boolean,
      default: true,
    },
    showSafeArea: {
      type: Boolean,
      default: true,
    },
    mIndex: {
      type: Number,
      default: 101,
    },
    opacity: {
      type: Number,
      default: 1,
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const modalStatu = ref(false);
    const modalClick = () => {
      if (props.clickModalClose) {
        modalStatu.value = false;
        emit("close");
      }
    };

    watch(props, (newValue) => {
      if (newValue.visible) {
        modalStatu.value = true;
      } else {
        modalStatu.value = false;
      }
    });

    const renderPopHead = () => {
      return slots.head ? (
        slots.head!()
      ) : (
        <div class="pop-head">
          <div class="pop-title">{props.title}</div>
          <div class="pop-close" onClick={modalClick}>
            {/* <i class="iconfont icon-"></i> */}
            关闭
          </div>
        </div>
      );
    };

    const renderPopup = () => {
      return (
        <div
          class={["popup-box", "pop-" + props.direction]}
          v-show={modalStatu.value}
          style={props.style}
        >
          {renderPopHead()}
          <div class={["pop-body", props.showSafeArea ? "safe-area" : ""]}>
            {slots.default ? slots.default!() : null}
          </div>
        </div>
      );
    };
    const renderTransition = () => {
      const name =
        props.direction === "center"
          ? "pop-fade"
          : `pop-slide-${props.direction}`;
      return <Transition name={name}>{renderPopup()}</Transition>;
    };

    return () => {
      const { opacity, mIndex } = props;
      return (
        <>
          <Modal
            mIndex={mIndex}
            show={modalStatu.value}
            onClickModal={modalClick}
            lockScroll={true}
            opacity={opacity}
          />
          {renderTransition()}
        </>
      );
    };
  },
});
