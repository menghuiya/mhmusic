import { getRankList } from "@/api/public";
import Nav from "@/components/Nav/Nav";
import SliderNav from "@/components/SliderNav/SliderNav";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import { sampleSize } from "@/utils/tool";
import { defineComponent, onMounted, ref } from "vue";
import { RecomdSheetItem } from "../home/components/types";
import "./rank.scss";

export default defineComponent({
  name: "test",
  setup() {
    const navData = ref<any>([
      { id: 0, name: "官方" },
      { id: 1, name: "精选" },
      { id: 2, name: "曲风" },
      { id: 3, name: "全球" },
      { id: 4, name: "MV" },
      { id: 5, name: "特色" },
    ]);
    const currentSliderId = ref(0);
    const listSheetData = ref<RecomdSheetItem[]>([]);
    const officeSheetData = ref<RecomdSheetItem[]>([]);
    const choiceSheetData = ref<RecomdSheetItem[]>([]);
    const genreSheetData = ref<RecomdSheetItem[]>([]);
    const globalSheetData = ref<RecomdSheetItem[]>([]);
    const charaSheetData = ref<RecomdSheetItem[]>([]);
    const logoimg = require("@/assets/images/logo.png");

    const choiceSheetMap = [
      "硬地原创音乐榜",
      "黑胶VIP爱听榜",
      "K歌榜",
      "云音乐达人榜",
      "网络热歌榜",
    ];
    const genreSheetMap = [
      "云音乐电音榜",
      "云音乐ACG榜",
      "云音乐说唱榜",
      "云音乐摇滚榜",
      "云音乐民谣榜",
      "云音乐国电榜",
      "云音乐古典榜",
      "云音乐古风榜",
      "中文DJ榜",
    ];
    const globalSheetMap = [
      "美国Billboard榜",
      "UK排行榜周榜",
      "日本Oricon榜",
      "法国 NRJ Vos Hits 周榜",
      "俄罗斯top hit流行音乐榜",
      "云音乐欧美新歌榜",
      "云音乐欧美热歌榜",
      "云音乐日语榜",
      "云音乐韩语榜",
      "俄语榜",
      "越南语榜",
    ];
    const charaSheetMap = [
      "火前留名榜",
      "听歌识曲榜",
      "潜力爆款榜",
      "中国新乡村音乐排行榜",
      "KTV唛榜",
      "Beatport全球电子舞曲榜",
    ];

    const sliderChange = (value: number) => {
      currentSliderId.value = value;
    };

    onMounted(() => {
      getRankList().then((res: any) => {
        listSheetData.value = res.list.filter(
          (item: any) => item.updateFrequency === "每周五更新"
        );
        officeSheetData.value = res.list.filter(
          (item: any) => item.ToplistType
        );
        choiceSheetData.value = res.list.filter((item: any) =>
          choiceSheetMap.includes(item.name)
        );
        genreSheetData.value = res.list.filter((item: any) =>
          genreSheetMap.includes(item.name)
        );
        globalSheetData.value = res.list.filter((item: any) =>
          globalSheetMap.includes(item.name)
        );
        charaSheetData.value = res.list.filter((item: any) =>
          charaSheetMap.includes(item.name)
        );
      });
    });

    return () => {
      return (
        <div class="mhrank">
          <div class="mhrank-head">
            <Nav
              iconSize="0.5rem"
              class="sheetcate-nav"
              v-slots={{
                right: () => null,
                center: () => <span class="mhrank-head-title">排行榜</span>,
              }}
              backStatus={true}
            />
            <SliderNav sliderData={navData.value} onChange={sliderChange} />
          </div>
          <div class="mhrank-body">
            <div class="mhrank-body-recomm">
              <div class="common-title">
                <span>榜单推荐</span>
              </div>
              <div class="mhrank-body-recomm-content">
                {sampleSize(listSheetData.value, 3).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="mhrank-body-recomm-card"
                        origin="rank"
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div class="common-title">
              <img src={logoimg} alt="" />
              <span>官方榜</span>
            </div>
            <div>
              {officeSheetData.value.length
                ? officeSheetData.value.map((item: RecomdSheetItem) => {
                    return (
                      <div class="mhrank-body-offcirank">
                        <div class="mhrank-body-offcirank-tag">
                          {item.updateFrequency}
                        </div>
                        <div class="mhrank-body-offcirank-card">
                          <div class="mhrank-body-offcirank-left">
                            <div class="mhrank-body-offcirank-left-title">
                              {item.name}
                            </div>
                            <div>
                              <img
                                src={item.coverImgUrl}
                                alt=""
                                class="mhrank-body-offcirank-left-img"
                              />
                            </div>
                          </div>
                          <div class="mhrank-body-offcirank-right">
                            {item.tracks.map((track: any, index: number) => {
                              return (
                                <div class="mhrank-body-offcirank-right-item">
                                  <div class="mhrank-item-info">
                                    {index}. {track.first}
                                    <span class="mhrank-item-author">
                                      -{track.second}
                                    </span>
                                  </div>
                                  <span>–</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div class="mhrank-body-common">
              <div class="common-title">
                <span>精选榜</span>
              </div>
              <div class="mhrank-body-common-content">
                {sampleSize(choiceSheetData.value, 6).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="mhrank-body-common-content-card"
                        origin="rank"
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div class="mhrank-body-common">
              <div class="common-title">
                <span>曲风榜</span>
              </div>
              <div class="mhrank-body-common-content">
                {sampleSize(genreSheetData.value, 9).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="mhrank-body-common-content-card"
                        origin="rank"
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div class="mhrank-body-common">
              <div class="common-title">
                <span>全球榜</span>
              </div>
              <div class="mhrank-body-common-content">
                {sampleSize(globalSheetData.value, 11).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="mhrank-body-common-content-card"
                        origin="rank"
                      />
                    );
                  }
                )}
              </div>
            </div>
            <div class="mhrank-body-common">
              <div class="common-title">
                <span>特色榜</span>
              </div>
              <div class="mhrank-body-common-content">
                {sampleSize(charaSheetData.value, 6).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="mhrank-body-common-content-card"
                        origin="rank"
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };
  },
});
