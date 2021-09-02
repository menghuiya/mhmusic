import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchAlbum",

  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是专辑</div>;
    };
  },
});
