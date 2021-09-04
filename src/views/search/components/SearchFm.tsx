import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchFm",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是电台的</div>;
    };
  },
});
