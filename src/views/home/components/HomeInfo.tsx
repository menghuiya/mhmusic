import { defineComponent } from "vue";
import Popup from "@/components/Popup/Popup";
import CellItem from "@/components/Cell/CellItem";
import TitleLine from "@/components/TitleLine/TitleLine";
import "./info.scss";

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
    const closePop = () => {
      emit("close");
    };

    const userLogin = () => {
      confirm("confirm 弹出框");
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
            <CellItem icon="icon-dengpaobeifen" title="创作者中心" />
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
            <CellItem icon="icon-shezhi" title="设置" />
            <CellItem icon="icon-yueliang" title="夜间模式" />
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
            style={{ width: "8rem", height: "100%", background: "#F1F1F1" }}
            v-slots={{
              head: () => (
                <div class="info-head">
                  <CellItem
                    onClick={userLogin}
                    title="立即登录"
                    icon="icon-yonghu-yuan"
                    arrowIcon="icon-saoma"
                    iconSize="0.7rem"
                    arrowStyle={{
                      fontSize: "0.6rem",
                      color: "#000",
                    }}
                    titleStyle={{
                      fontSize: "0.4rem",
                      fontWeight: 600,
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
