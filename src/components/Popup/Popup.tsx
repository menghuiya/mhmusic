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
  components: { Modal },
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
      default: "",
    },
    style: {
      type: Object as PropType<CSSProperties>,
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const modalStatu = ref(false);
    const modalClick = () => {
      modalStatu.value = false;
      emit("close");
    };
    const onOpened = () => {
      console.log("open");
    };
    const onClose = () => {
      console.log("close");
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
          <div class="pop-body">{slots.default ? slots.default!() : null}</div>
        </div>
      );
    };
    const renderTransition = () => {
      const name =
        props.direction === "center"
          ? "pop-fade"
          : `pop-slide-${props.direction}`;
      return (
        <Transition name={name} onAfterEnter={onOpened} onAfterLeave={onClose}>
          {renderPopup()}
        </Transition>
      );
    };

    return () => {
      return (
        <>
          <Modal
            mIndex={101}
            show={modalStatu.value}
            onClickModal={modalClick}
            lockScroll={true}
          />
          {renderTransition()}
        </>
      );
    };
  },
});
