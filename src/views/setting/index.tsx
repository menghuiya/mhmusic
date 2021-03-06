import CellItem from "@/components/Cell/CellItem";
import Nav from "@/components/Nav/Nav";
import Switch from "@/components/Switch/Switch";
import { PlayBoxState } from "@/utils/types";
import {
  CSSProperties,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { nodeData } from "./baseData";
import "./index.scss";
import { setDataItem } from "./type";

export default defineComponent({
  name: "index",
  setup() {
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

    const setState = reactive({
      netPlayState: true,
      netdownloadState: false,
      autoWifiPlayVideoState: true,
      autoGpsPlayVideoState: false,
      netSkipState: false,
      bokeFmState: true,
      blockScrenWord: true,
      blockScrenTps: false,
      runFmNonet: false,
      liveRermote: false,
      blockScrenRed: false,
    }) as Record<string, boolean>;

    onBeforeRouteUpdate(() => {
      const _this = getCurrentInstance()?.proxy as any;
      _this.$router.isPush = true;
    });

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
            {nodeData.map((item: setDataItem) => {
              if (item.type === "title") {
                return <div class="setting-body-title">{item.title}</div>;
              }
              if (item.type === "cell") {
                return (
                  <CellItem
                    title={item.title}
                    class="setting-cell"
                    arrow={item.arrow}
                    v-slots={{
                      right: () => {
                        return item.isSwitch && item.filedName ? (
                          <Switch
                            v-model={setState[item.filedName]}
                            activeColor="#EB4D44"
                            width="1rem"
                          />
                        ) : item.value ? (
                          <div class="cell-value">{item.value}</div>
                        ) : null;
                      },
                    }}
                  />
                );
              }
            })}
          </div>
        </div>
      );
    };
  },
});
