import { defineComponent } from "vue";
import "./common.scss";

export default defineComponent({
  name: "CommonPage",
  props: {
    show: Boolean,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>通用歌单</div>;
    };
  },
});
