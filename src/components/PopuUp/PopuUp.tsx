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
      default: "",
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
    const renderStyle = () => {
      const styleMap = {
        zIndex: 888,
        width: "",
        height: "",
      };
      if (props.direction === "left" || props.direction === "right") {
        styleMap.width = props.visible ? props.width : "0";
      } else {
        styleMap.height = props.visible ? props.height : "0";
      }
      return styleMap;
    };
    const renderPop = () => {
      return (
        <div class={["pop", "pop-" + props.direction]} style={renderStyle()}>
          <Modal
            mIndex={101}
            isOpen={modalStatu.value}
            onCloseModal={modalClick}
          />
          <div class={["pop-container"]}>
            <div class="pop-head">
              <div class="dialog-title">标题</div>
              <div class="dialog-close" onClick={closeBtnClick}>
                {/* <i class="iconfont icon-"></i> */}
                关闭
              </div>
            </div>
            <div class="pop-body">
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
              <div>你是🐖^(*￣(oo)￣)^吗</div>
            </div>
          </div>
        </div>
      );
    };
    return () => {
      return renderPop();
    };
  },
});
