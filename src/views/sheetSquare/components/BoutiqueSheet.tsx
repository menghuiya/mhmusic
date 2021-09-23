import { defineComponent } from "vue";
import "./common.scss";

export default defineComponent({
  name: "BoutiqueSheet",
  props: {
    show: Boolean,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>精品歌单</div>;
    };
  },
});
