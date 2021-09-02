import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchMusicSheet",
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是歌单的</div>;
    };
  },
});
