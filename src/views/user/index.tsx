import { defineComponent, inject, onBeforeUnmount, onMounted } from "vue";
import UserTop from "./profileCom/UserTop";
import UserContent from "./profileCom/UserContent";
import { PlayBoxState } from "@/utils/types";
import "./index.scss";

export default defineComponent({
  name: "index",
  props: {},
  setup(props, { emit, slots }) {
    const playBox = inject<PlayBoxState>("PlayBoxKey");
    onMounted(() => {
      playBox?.close();
    });

    onBeforeUnmount(() => {
      playBox?.open();
    });
    return () => {
      return (
        <div class="m-user">
          <UserTop />
          <UserContent />
        </div>
      );
    };
  },
});
