import { CSSProperties, defineComponent, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "UserContent",
  props: {
    visible: Boolean,
  },
  setup(props, { emit, slots }) {
    const navActiveId = ref(0); //选中tabid
    const navBoxRef = ref(); // nav的refs
    const navUnderlinStyle = ref<CSSProperties>({});
    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };
    return () => {
      return (
        <div class="ucontent">
          <div class="msearch-nav" ref={navBoxRef}>
            <div class="msearch-nav-box">
              <div
                class={[
                  "msearch-nav-item",
                  navActiveId.value === 1 ? "msearch-nav-active" : "",
                ]}
              >
                主页
              </div>
              <div
                class={[
                  "msearch-nav-item",
                  navActiveId.value === 1 ? "msearch-nav-active" : "",
                ]}
              >
                动态
              </div>
              <div
                class={[
                  "msearch-nav-item",
                  navActiveId.value === 1 ? "msearch-nav-active" : "",
                ]}
              >
                播客
              </div>
            </div>
            <i class="msearch-nav-underline" style={navUnderlinStyle.value}></i>
          </div>
        </div>
      );
    };
  },
});
