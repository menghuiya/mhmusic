import { defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  name: "SearchMusicWord",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div class="musicword">暂未开发！</div>;
    };
  },
});
