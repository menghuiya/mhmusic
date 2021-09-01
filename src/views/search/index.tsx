import { width } from "dom7";
import { CSSProperties, defineComponent, nextTick, onMounted, ref } from "vue";
import "./index.scss";
import { searchNavData } from "./searchBaseData";

export default defineComponent({
  name: "index",
  props: {},
  setup(props, { emit, slots }) {
    const inputRef = ref();
    const keyword = ref("");
    const realkeyword = ref("");
    const placeholder = ref("搜索音乐、视频、播客、歌词");
    const navActiveId = ref(1); //选中tabid
    const navBoxRef = ref(); // nav的refs
    const navUnderlinStyle = ref<CSSProperties>({});

    const closeSearch = () => {
      clear();
      emit("close");
    };
    const clear = () => {
      keyword.value = "";
    };

    const inputData = (event: any) => {
      keyword.value = event.target.value;
      // console.log(keyword.value);
    };
    const onFocus = (event: any) => {
      // keyword.value = event.target.value;
      // console.log("onFocus");
    };
    const onBlur = (event: any) => {
      // keyword.value = event.target.value;
      // console.log("onBlur");
    };

    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };

    type ClickHandler = (item: any) => (e: MouseEvent) => void;
    const handleNavItem: ClickHandler = (item) => (e) => {
      e.preventDefault();
      navActiveId.value = item.id;
      const navActive: any = e.currentTarget;
      const navWidth = navBoxRef.value.offsetWidth;
      if (navActive) {
        const navOffsetWidth = navActive.offsetLeft;
        const diffWidth = (navWidth - navActive.offsetWidth) / 2; //中间值
        const targetWidth = navOffsetWidth - diffWidth;
        navBoxRef.value.scrollLeft = targetWidth;
        moveUnderLine(navActive.offsetWidth, navOffsetWidth);
      }
    };
    onMounted(() => {
      nextTick(() => {
        const navActive: any = document.querySelector(".msearch-nav-active");
        moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
      });
    });

    return () => {
      return (
        <div class="msearch">
          <div class="msearch-top">
            <div class="msearch-head">
              <i class="iconfont icon-fanhui msearch-head-back"></i>
              <div class="msearch-head-box">
                <i class="iconfont icon-sousuo"></i>
                <input
                  class="msearch-head-input"
                  type="text"
                  placeholder={placeholder.value}
                  value={keyword.value}
                  onInput={inputData}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  ref={inputRef}
                  autofocus={true}
                />
                <i
                  class="iconfont icon-shanchu2"
                  onClick={clear}
                  v-show={keyword.value}
                ></i>
              </div>
            </div>
            <div class="msearch-nav" ref={navBoxRef}>
              <div class="msearch-nav-box">
                {searchNavData.map((item) => {
                  return (
                    <div
                      class={[
                        "msearch-nav-item",
                        navActiveId.value === item.id
                          ? "msearch-nav-active"
                          : "",
                      ]}
                      onClick={handleNavItem(item)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
              <i
                class="msearch-nav-underline"
                style={navUnderlinStyle.value}
              ></i>
            </div>
          </div>
          <div class="msearch-body">
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
            <h2>身体</h2>
          </div>
        </div>
      );
    };
  },
});
