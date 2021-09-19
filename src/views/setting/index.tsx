import CellItem from "@/components/Cell/CellItem";
import Nav from "@/components/Nav/Nav";
import Switch from "@/components/Switch/Switch";
import { PlayBoxState } from "@/utils/types";
import {
  CSSProperties,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import "./index.scss";

export default defineComponent({
  name: "index",
  props: {},
  setup(props, { emit, slots }) {
    const playBox = inject<PlayBoxState>("PlayBoxKey");
    onMounted(() => {
      playBox?.close();
    });

    onBeforeUnmount(() => {
      playBox?.open();
    });
    const arrowStyle: CSSProperties = {
      borderBottom: "1px solid #f8f8f8",
      background: "#fff",
    };
    const netPlayState = ref(true);
    const netdownloadState = ref(false);
    const autoWifiPlayVideoState = ref(true);
    const autoGpsPlayVideoState = ref(false);
    const netSkipState = ref(false);
    const bokeFmState = ref(true);
    const blockScrenWord = ref(true);
    const blockScrenTps = ref(false);
    const runFmNonet = ref(false);
    const liveRermote = ref(false);
    const blockScrenRed = ref(false);

    return () => {
      return (
        <div class="setting">
          <Nav
            backStatus={true}
            iconSize="0.6rem"
            style={{
              background: "#fff",
              padding: "0.35rem 0.25rem",
            }}
            v-slots={{
              right: () => null,
              center: () => <span>设置</span>,
            }}
          />
          <div class="setting-body">
            <div class="setting-body-title">网络</div>
            <CellItem
              title="使用3G/4G/5G网络播放"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={netPlayState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="使用3G/4G/5G网络下载"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={netdownloadState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="动态页中WiFi下自动播放视频"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={autoWifiPlayVideoState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="流量下进入视频详情页自动播放"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={autoGpsPlayVideoState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <div class="setting-body-title">播放和下载</div>
            <CellItem
              title="K歌作品详情页自动跳过前奏"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={netSkipState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem title="在线播放音质" style={arrowStyle} />
            <CellItem title="下载音质" style={arrowStyle} />
            <CellItem title="清除缓存" style={arrowStyle} />
            <CellItem
              title="播客随心听FM自动播放"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={bokeFmState.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <div class="setting-body-title">账号和隐私</div>
            <CellItem title="账号和绑定设置" style={arrowStyle} />
            <CellItem title="会员登陆设备管理" style={arrowStyle} />
            <CellItem title="寻找并邀请好友" style={arrowStyle} />
            <CellItem title="消息和隐私设置" style={arrowStyle} />
            <CellItem title="登录保护" style={arrowStyle} />
            <CellItem title="系统权限设置" style={arrowStyle} />
            <div class="setting-body-title">工具</div>
            <CellItem
              title="锁屏歌词"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={blockScrenWord.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="截屏后提示分享"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={blockScrenTps.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="跑步FM离线包"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={runFmNonet.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="直播内容推荐"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={liveRermote.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem
              title="手机锁屏菜单支持加“红心”"
              style={arrowStyle}
              arrow={false}
              v-slots={{
                right: () => (
                  <Switch
                    v-model={blockScrenRed.value}
                    activeColor="#EB4D44"
                    width="1rem"
                  />
                ),
              }}
            />
            <CellItem title="顶部导航自定义" style={arrowStyle} />
            <CellItem title="账号页管理" style={arrowStyle} />
            <CellItem title="智能硬件" style={arrowStyle} />
            <CellItem title="HomePod绑定" style={arrowStyle} />
          </div>
        </div>
      );
    };
  },
});
