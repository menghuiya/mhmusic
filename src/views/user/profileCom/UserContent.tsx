import {
  CSSProperties,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import "./index.scss";
import { ClickEventFuncType } from "@/utils/types";

export default defineComponent({
  name: "UserContent",
  props: {
    visible: Boolean,
    overHeight: Boolean,
  },
  setup(props, { emit, slots }) {
    const navActiveId = ref(0); //选中tabid
    const navBoxRef = ref(); // nav的refs
    const navUnderlinStyle = ref<CSSProperties>({});
    const swipeRef = ref(); //swiper的实例
    const baseNavData = [
      { id: 0, name: "主页", type: 1018 },
      { id: 1, name: "动态", type: 1 },
      { id: 2, name: "播客", type: 1000 },
    ];

    const moveUnderLine = (width: number | string, left: number | string) => {
      navUnderlinStyle.value = {
        width: width + "px",
        left: left + "px",
      };
    };

    const handleNavItem: ClickEventFuncType = (item) => (e) => {
      e.preventDefault();
      navActiveId.value = item.id;
      swipeToCurrentTab(navActiveId.value);
    };

    watch(
      () => navActiveId.value,
      () => {
        nextTick(() => {
          const navActive: any = document.querySelector(".ucontent-nav-active");
          const navWidth = navBoxRef.value.offsetWidth;
          if (navActive) {
            const navOffsetWidth = navActive.offsetLeft;
            const diffWidth = (navWidth - navActive.offsetWidth) / 2; //中间值
            const targetWidth = navOffsetWidth - diffWidth;
            navBoxRef.value.scrollLeft = targetWidth;
            moveUnderLine(navActive.offsetWidth, navOffsetWidth);
            // if (!seachData[searchNavData[navActiveId.value].type]) {
            //   getData(searchNavData[navActiveId.value].type);
            // }
          }
        });
      }
    );

    watch(
      () => props.overHeight,
      (newValue) => {
        if (newValue) {
          navBoxRef.value.style.backgroundColor = "#fff";
        } else {
          navBoxRef.value.style.backgroundColor = "";
        }
      }
    );

    onMounted(() => {
      nextTick(() => {
        const navActive: any = document.querySelector(".ucontent-nav-active");
        moveUnderLine(navActive.offsetWidth, navActive.offsetLeft);
      });
      swipeToCurrentTab(navActiveId.value);
    });

    const swipeToCurrentTab = (index: number) => {
      // console.log(swipeRef.value);
      if (swipeRef.value) {
        swipeRef.value.slideTo(index, 500, false);
      }
    };
    const onSwiper = (swiper: any) => {
      swipeRef.value = swiper;
    };

    const onSlideChange = (swiper: any) => {
      navActiveId.value = swiper.activeIndex;
    };

    return () => {
      return (
        <div class="ucontent">
          <div class="ucontent-nav" ref={navBoxRef}>
            <div class="ucontent-nav-box">
              {baseNavData.map((item: any) => {
                return (
                  <div
                    class={[
                      "ucontent-nav-item",
                      navActiveId.value === item.id
                        ? "ucontent-nav-active"
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
              class="ucontent-nav-underline"
              style={navUnderlinStyle.value}
            ></i>
          </div>
          <div class="ucontent-body">
            <swiper
              class="msearch-body-track"
              onSwiper={onSwiper}
              onSlideChange={onSlideChange}
            >
              <swiper-slide>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss</h3>
                <h3>sssss111</h3>
              </swiper-slide>
              <swiper-slide>dddd</swiper-slide>
              <swiper-slide>ssssddwawas</swiper-slide>
            </swiper>
          </div>
        </div>
      );
    };
  },
});
