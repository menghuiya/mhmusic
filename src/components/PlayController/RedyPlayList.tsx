import { defineComponent } from "vue";
import Popup from "@/components/Popup/Popup";
import CellItem from "@/components/Cell/CellItem";
import "./list.scss";
import store from "@/store";

export default defineComponent({
  name: "RedyPlayList",

  props: {
    popVisible: {
      type: Boolean,
      default: false,
    },
    playList: {
      type: Array,
      default: () => [],
    },
    currentIndex: Number,
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const closePop = () => {
      emit("close");
    };
    type ClickHandler = (index: number) => (e: MouseEvent) => void;
    const clickHandler: ClickHandler = (index) => (e) => {
      e.preventDefault();
      store.commit("setPlayCurrntIndex", index);
    };
    const renderRedyPlayList = () => {
      return props.playList.map((item: any, index: number) => {
        return (
          <CellItem
            title={item.name}
            style={{
              paddingLeft: "0",
              paddingRight: "0",
            }}
            arrow={false}
            v-slots={{
              icon: () => null,
              title: () => (
                <div
                  class={[
                    "read-play-music-left",
                    index === props.currentIndex ? " active" : "",
                  ]}
                  onClick={clickHandler(index)}
                >
                  <span class="read-play-music-left-name">{item.name}</span>
                  <span class="read-play-music-left-author">
                    - {item.ar[0].name}
                  </span>
                </div>
              ),
              right: () => (
                <i class="iconfont icon-shanchu read-play-item-delete"></i>
              ),
            }}
          ></CellItem>
        );
      });
    };
    const renderSlotsDefault = () => {
      return (
        <div class="read-play">
          <div class="read-play-head-box">
            <div class="read-play-head">
              <span class="read-play-head-title">当前播放</span>
              <span class="read-play-head-nums">(100)</span>
            </div>
            <div class="read-play-action">
              <div class="read-play-action-left">
                <i class="iconfont icon-xunhuan"></i>
                <span>列表循环</span>
              </div>
              <div class="read-play-action-right">
                <i class="iconfont icon-zengjiashuzi"></i>
                <span class="collect-all">收藏全部</span>
                <i class="iconfont icon-shanchu1"></i>
              </div>
            </div>
          </div>
          <div class="read-play-music">{renderRedyPlayList()}</div>
        </div>
      );
    };
    const popSlots = {
      default: () => renderSlotsDefault(),
      head: () => null,
    };
    return () => {
      return (
        <>
          <Popup
            visible={props.popVisible}
            onClose={closePop}
            direction="bottom"
            style={{
              height: "60%",
              width: "95%",
              left: "2.5%",
              bottom: "0.5rem",
              borderRadius: "0.3rem",
              overflow: "hidden",
            }}
            v-slots={popSlots}
          ></Popup>
        </>
      );
    };
  },
});
