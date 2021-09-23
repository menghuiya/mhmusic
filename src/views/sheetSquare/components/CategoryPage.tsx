import { defineComponent } from "vue";
import "./common.scss";

export default defineComponent({
  name: "CategoryPage",
  props: {
    show: Boolean,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>s所有歌单</div>;
    };
  },
});
