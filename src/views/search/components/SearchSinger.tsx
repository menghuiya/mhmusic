import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchSinger",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是歌手的</div>;
    };
  },
});
