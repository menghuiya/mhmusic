import {
  computed,
  CSSProperties,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import store from "@/store";
import UserTop from "./profileCom/UserTop";
import UserContent from "./profileCom/UserContent";
import { PlayBoxState } from "@/utils/types";
import "./index.scss";
import Nav from "@/components/Nav/Nav";
import { getUserVipinfo } from "@/api/user";

export default defineComponent({
  name: "user",
  props: {},
  setup(props, { emit, slots }) {
    const userinfo = computed(() => store.state.userInfo);
    const dark = computed(() => store.state.dark);
    const iconColor = ref("#fff");
    const headEle = ref();
    const imgEle = ref();
    const overflowHeight = ref(0);
    const headHeight = ref(0);
    const scrollHeight = ref(0);
    const overHeight = ref(false);
    const navStyle = reactive<CSSProperties>({
      background: undefined,
      color: "#fff",
    });
    const vipinfo = ref<any>(null);
    // onMounted(() => {
    //   playBox?.close();
    // });

    // onBeforeUnmount(() => {
    //   playBox?.open();
    // });
    const scollerMore = () => {
      navStyle.background = dark.value ? "#000 !important" : "#fff !important";
      navStyle.color = dark.value ? "#fff" : "#000";
      iconColor.value = dark.value ? "#fff" : "#000";
    };
    const scollerLess = () => {
      navStyle.background = undefined;
      navStyle.color = "#fff";
      iconColor.value = "#fff";
    };
    const startScroll = (val: number) => {
      scrollHeight.value = val;
      if (scrollHeight.value >= headHeight.value) {
        overHeight.value = true;
      } else {
        overHeight.value = false;
      }
    };
    const getUserVip = () => {
      getUserVipinfo().then((res) => {
        vipinfo.value = res.data;
      });
    };

    onMounted(() => {
      getUserVip();
      nextTick(() => {
        overflowHeight.value = imgEle.value.offsetHeight;
        headHeight.value = headEle.value.offsetHeight;
        window.scroll(0, 0);
      });
    });

    return () => {
      return (
        <div class="m-user">
          <Nav
            backStatus={true}
            iconColor={iconColor.value}
            style={navStyle}
            onMoreNav={scollerMore}
            onLessNav={scollerLess}
            overflowHeight={overflowHeight.value}
            onScroll={startScroll}
            v-slots={{
              center: () => (
                <div class="m-user-vip">
                  {userinfo.value.profile.nickname}
                  {vipinfo.value ? (
                    <img src={vipinfo.value.redVipDynamicIconUrl2} alt="" />
                  ) : null}
                </div>
              ),
            }}
          />

          <div ref={headEle}>
            <div
              class="usertop-bgimg"
              style={{
                backgroundImage: `url(${userinfo.value.profile.backgroundUrl})`,
              }}
              ref={imgEle}
            ></div>
            <UserTop />
          </div>

          <UserContent overHeight={overHeight.value} />
        </div>
      );
    };
  },
});
