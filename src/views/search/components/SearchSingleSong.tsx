import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchSingleSong",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是单曲的吧</div>;
    };
  },
});
