import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchAllPage",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return () => {
      return <div>这里是综合的界面</div>;
    };
  },
});
