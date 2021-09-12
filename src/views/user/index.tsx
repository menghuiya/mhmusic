import { defineComponent } from "vue";

export default defineComponent({
  name: "index",
  props: {},
  setup(props, { emit, slots }) {
    return () => {
      return <div>我是个人中心呢</div>;
    };
  },
});
