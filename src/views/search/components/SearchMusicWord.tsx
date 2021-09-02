import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchMusicWord",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是歌词的</div>;
    };
  },
});
