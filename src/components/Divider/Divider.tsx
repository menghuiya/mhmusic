import { defineComponent, PropType } from "vue";
import "./index.scss";
export type DividerContentPosition = "left" | "center" | "right";

export default defineComponent({
  name: "Divider",
  props: {
    position: {
      type: String as PropType<DividerContentPosition>,
      default: "center",
    },
    dashed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    return () => {
      const { position, dashed } = props;
      return (
        <div
          class={[
            "divider",
            `divider-${position}`,
            dashed ? "divider-dashed" : "",
          ]}
        >
          {slots.default ? slots.default() : null}
        </div>
      );
    };
  },
});
