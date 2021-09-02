import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchUser",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是用户的</div>;
    };
  },
});
