import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchMv",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是MV</div>;
    };
  },
});
