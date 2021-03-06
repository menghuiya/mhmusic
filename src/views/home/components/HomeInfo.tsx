import {
  computed,
  defineComponent,
  inject,
  onDeactivated,
  ref,
  watch,
} from "vue";
import Popup from "@/components/Popup/Popup";
import CellItem from "@/components/Cell/CellItem";
import TitleLine from "@/components/TitleLine/TitleLine";
import "./info.scss";
import Confirm from "@/components/Confirm";
import router from "@/router";
import store from "@/store";
import { logout } from "@/api/login";
import Toast from "@/components/Toast";
import Switch from "@/components/Switch/Switch";
import { DarkControllerState } from "@/utils/types";

export default defineComponent({
  name: "HomeInfo",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const darkThem = inject<DarkControllerState>("DarkControllerKey");

    const changeDark = (val: boolean) => {
      darkThem?.modelBrn(val);
    };
    onDeactivated(() => {
      closePop();
    });
    const userInfo = computed(() => {
      return store.state.userInfo;
    });

    const dayNightState = ref(false);
    watch(
      () => store.state.dark,
      (value) => {
        dayNightState.value = value;
      },
      { immediate: true }
    );
    const closePop = () => {
      emit("close");
    };

    const userLogin = () => {
      router.push({
        path: "/user",
      });
    };
    const openQrCode = () => {
      Confirm({
        title: "温馨提示",
        message: "哈哈哈暂未开通哦",
        showCancelButton: false,
        confirmButtonText: "知道啦",
      });
    };

    const handleLogout = () => {
      logout().then((res: any) => {
        if (res.code === 200) {
          store.commit("setLogout");
          Toast.success("退出成功");
          closePop();
          router.push("/login");
          return;
        }
        Toast.fail("退出失败");
      });
    };

    const setClick = () => {
      router.push("/setting");
    };
    const handleCreatorCenter = () => {
      router.push("/creatorCenter");
    };

    const renderUserInfo = (): JSX.Element => {
      return (
        <div class="left-icon" onClick={userLogin}>
          {userInfo.value.isLogin ? (
            <img src={userInfo.value.profile.avatarUrl} />
          ) : (
            <i class={["iconfont icon-yonghu-yuan"]}></i>
          )}
        </div>
      );
    };
    const renderUserIcon = (): JSX.Element => {
      return (
        <div class="info-head-title" onClick={userLogin}>
          {userInfo.value.isLogin ? (
            <span>
              {userInfo.value.profile.nickname}
              <i class="iconfont icon-qianjin1"></i>{" "}
            </span>
          ) : (
            "请登录账号"
          )}
        </div>
      );
    };

    const renderDefault = (): JSX.Element => {
      return (
        <div class="info-content">
          <div class="info-content-blackvip">
            <div class="info-vip-top">
              <TitleLine
                title="开通黑胶VIP"
                noPadding={true}
                btnName="会员中心"
                icon=""
              />
            </div>
            <div class="info-vip-bottom">受邀专享，黑胶VIP首月仅1元</div>
          </div>
          <div class="info-content-group">
            <CellItem icon="icon-xinfeng" title="消息中心" value="阅读消息" />
            <CellItem
              icon="icon-qiandaijinbi"
              title="云贝中心"
              value="40云贝待领取"
            />
            <CellItem
              icon="icon-dengpaobeifen"
              onClick={handleCreatorCenter}
              title="创作者中心"
            />
          </div>
          <div class="info-content-group">
            <div class="info-content-group-title">音乐服务</div>
            <CellItem icon="icon-ziyuan124" title="演出" />
            <CellItem icon="icon-gouwudai" title="商城" />
            <CellItem icon="icon-cailing" title="口袋铃声" />
            <CellItem icon="icon-94" title="游戏专区" />
          </div>
          <div class="info-content-group">
            <div class="info-content-group-title">其他</div>
            <CellItem icon="icon-shezhi" title="设置" onClick={setClick} />
            <CellItem
              icon="icon-yueliang"
              title="夜间模式"
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={dayNightState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                    onChange={changeDark}
                  />
                ),
              }}
            />
            <CellItem icon="icon-dingshi_timing" title="定时关闭" />
            <CellItem icon="icon-yifu" title="个性装扮" />
            <CellItem icon="icon-erji" title="边听边存" value="未开启" />
            <CellItem icon="icon-zaixianliucheng" title="在线听歌免流量" />
            <CellItem icon="icon-zhizhang" title="添加Siri捷径" />
            <CellItem icon="icon-jinzhi" title="音乐黑名单" />
            <CellItem icon="icon-anquan" title="青少年模式" value="未开启" />
            <CellItem icon="icon-xianxingnaozhong" title="音乐闹钟" />
          </div>
          <div class="info-content-group">
            <CellItem icon="icon-kefu" title="我的客服" />
            <CellItem icon="icon-quanbudingdan" title="我的订单" />
            <CellItem icon="icon-youhuiquan" title="优惠券" />
            <CellItem icon="icon-fenxiang" title="分享梦回云音乐" />
            <CellItem icon="icon-guanyu" title="关于" />
          </div>
          {userInfo.value.isLogin ? (
            <div class="info-content-logout" onClick={handleLogout}>
              退出登录
            </div>
          ) : null}
        </div>
      );
    };

    return () => {
      return (
        <div>
          <Popup
            visible={props.visible}
            onClose={closePop}
            direction="left"
            style={{
              width: "8rem",
              height: "100%",
              background: "#F1F1F1",
              zIndex: 999,
            }}
            v-slots={{
              head: () => (
                <div class="info-head">
                  <CellItem
                    onRightClick={openQrCode}
                    arrowIcon="icon-saoma"
                    arrowStyle={{
                      fontSize: "0.6rem",
                      color: "#000",
                    }}
                    v-slots={{
                      icon: () => renderUserInfo(),
                      title: () => renderUserIcon(),
                    }}
                  />
                </div>
              ),
              default: () => renderDefault(),
            }}
          ></Popup>
        </div>
      );
    };
  },
});
