import { defineComponent, reactive, ref, Transition, watch } from "vue";
import "./index.scss";

import Modal from "@/components/Modal/Modal";

export default defineComponent({
  name: "PopuUp",
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
      type: Object,
    },
    //禁止页面滚动
    scroll: {
      type: Boolean,
      default: true,
    },
    transitionAppear: Boolean,
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const modalStatu = ref(false);
    const modalClick = () => {
      modalStatu.value = false;
      emit("close");
    };
    const onTouchMove = (event: Event) => {
      !props.scroll && event.preventDefault();
    };
    const hideOnBlur = () => {
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

    const renderPopup = () => {
      return (
        <div
          class={["popup-box", "pop-" + props.direction]}
          v-show={modalStatu.value}
          style={props.style}
        >
          {/* {slots.default?slots.default!():null} */}
          <div class="pop-head">
            <div class="pop-title">{props.title}</div>
            <div class="pop-close" onClick={modalClick}>
              {/* <i class="iconfont icon-"></i> */}
              关闭
            </div>
          </div>
          <div class="pop-body">{slots.default?.()}</div>
        </div>
      );
    };
    const renderTransition = () => {
      const name =
        props.direction === "center"
          ? "pop-fade"
          : `pop-slide-${props.direction}`;
      return (
        <Transition
          name={name}
          appear={props.transitionAppear}
          onAfterEnter={onOpened}
          onAfterLeave={onClose}
        >
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
          />
          {renderTransition()}
        </>
      );
    };
  },
});
