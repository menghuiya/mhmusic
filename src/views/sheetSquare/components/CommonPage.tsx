import Nav from "@/components/Nav/Nav";
import { defineComponent, onMounted, ref, Transition } from "vue";
import "./common.scss";
import CommonSheet from "./CommonSheet";

export default defineComponent({
  name: "CommonPage",
  props: {
    show: Boolean,
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const handleClose = () => {
      emit("close", { visible: false });
    };

    return () => {
      const { show, title } = props;
      return (
        <Transition name="sheetcate-fade">
          <div
            class={["commonPage", show ? "sheetcate-show" : ""]}
            v-show={show}
          >
            <Nav
              iconSize="0.5rem"
              class="sheetcate-nav"
              v-slots={{
                right: () => null,
                center: () => <span class="sheetcate-nav-title">{title}</span>,
              }}
              onLeftClick={handleClose}
            />
            <div class="sheetcate-body">
              <CommonSheet visible={show} cat={title} />
            </div>
          </div>
        </Transition>
      );
    };
  },
});
