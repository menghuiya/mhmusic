import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchVideos",
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    return () => {
      return <div>这里是视频的</div>;
    };
  },
});
