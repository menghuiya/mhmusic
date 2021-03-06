import { defineComponent, ref } from "vue";
import "./index.scss";
import { useStore } from "vuex";
import { getSongSheetDetailAll } from "@/api/songSheet";
import CellItem from "@/components/Cell/CellItem";

export default defineComponent({
  name: "SearchSingleSong",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    const store = useStore();
    type ClickEventFuncType = (item: any, type?: string) => (e: Event) => void;
    const playMusic: ClickEventFuncType = (item: any, type = "single") => (
      e
    ) => {
      if (props.data) {
        if (type === "single") {
          getSongSheetDetailAll(item.id).then((data: any) => {
            store.commit("setPlayList", data.songs[0]);
          });
        } else {
          const ids = props.data.songs.map((item: any) => item.id);
          getSongSheetDetailAll(ids.join(",")).then((data: any) => {
            store.commit("setPlayCurrntIndex", 0);
            store.commit("setSheetPlayList", data.songs);
          });
        }
      }
    };
    const playAll = () => {
      playMusic(null, "sheet");
    };
    return () => {
      return (
        <div class="song">
          <div class="song-head">
            <CellItem
              arrow={false}
              icon="icon-Controls-02"
              iconColor="red"
              iconSize="0.5rem"
              style={{
                padding: "0.15rem 0",
              }}
              onClick={playMusic(null, "sheet")}
              v-slots={{
                title: () => (
                  <>
                    <div class="song-head-title">播放全部</div>
                  </>
                ),
                right: () => (
                  <>
                    <i class="iconfont icon-n-check song-head-select"></i>
                  </>
                ),
              }}
            ></CellItem>
          </div>
          <div class="song-item">
            {props.data && props.data.songs ? (
              props.data.songs.map((item: any, index: number) => {
                return (
                  <CellItem
                    arrow={false}
                    style={{
                      borderTop: "1px solid #ebeef5",
                      padding: "0.25rem 0",
                      margin: "0 0.15rem",
                    }}
                    onClick={playMusic(item)}
                    v-slots={{
                      icon: () => null,
                      title: () => (
                        <div class="song-item-box">
                          <div class="song-item-box-name">{item.name}</div>
                          <div class="song-item-box-author">
                            {item.artists.map((art: any) => art.name).join("/")}
                          </div>
                        </div>
                      ),
                      right: () => (
                        <>
                          <i class="iconfont icon-bofangqi song-item-video"></i>
                          <i class="iconfont icon-gengduo song-item-more"></i>
                        </>
                      ),
                    }}
                  ></CellItem>
                );
              })
            ) : (
              <p>暂无数据....</p>
            )}
          </div>
        </div>
      );
    };
  },
});
