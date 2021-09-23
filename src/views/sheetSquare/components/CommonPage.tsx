import { defineComponent } from "vue";
import "./common.scss";

export default defineComponent({
  name: "CategoryPage",
  props: {
    show: Boolean,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>分类进入的歌单</div>;
    };
  },
});
