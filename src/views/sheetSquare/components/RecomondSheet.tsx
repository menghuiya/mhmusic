import { getRecomdSheet } from "@/api/home";
import { getPlayList } from "@/api/songSheet";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import TitleLine from "@/components/TitleLine/TitleLine";
import { sampleSize } from "@/utils/tool";
import { RecomdOptions, RecomdSheetItem } from "@/views/home/components/types";
import { defineComponent, onMounted, ref } from "vue";
import "./common.scss";

export default defineComponent({
  name: "RecomondSheet",

  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);
    const dayRecommdData = ref<RecomdSheetItem[]>([]);
    const officialData = ref<RecomdSheetItem[]>([]);
    const getRecommdData = () => {
      getRecomdSheet(20).then((res: RecomdOptions) => {
        sheetData.value = res.result;
      });
    };

    const getDayRecommdData = () => {
      getPlayList({
        order: "hot",
        limit: 30,
      }).then((res: any) => {
        dayRecommdData.value = res.playlists;
      });
    };
    const getOfficialData = () => {
      getPlayList({
        order: "hot",
        cat: "官方",
        limit: 30,
      }).then((res: any) => {
        officialData.value = res.playlists;
      });
    };

    onMounted(() => {
      getRecommdData();
      getDayRecommdData();
      getOfficialData();
    });
    return () => {
      return (
        <div class="RecomondSheet">
          <div class="common-title">
            <i class="iconfont icon-shuaxin1"></i>
            <span>Hi这个不咋地，快来听听</span>
          </div>
          <div class="RecomondSheet-ramdom">
            {sampleSize(sheetData.value, 6).map((item: RecomdSheetItem) => {
              return (
                <SongSheetCard
                  sheetData={item}
                  class="RecomondSheet-ramdom-card"
                />
              );
            })}
          </div>
          <div class="common-title">
            <span>今日编辑推荐</span>
          </div>
          <div class="RecomondSheet-dayre">
            <swiper slides-per-view="auto" space-between={8}>
              {sampleSize(dayRecommdData.value, 6).map(
                (item: RecomdSheetItem) => {
                  return (
                    <swiper-slide class="RecomondSheet-dayre-card">
                      <SongSheetCard sheetData={item} />
                    </swiper-slide>
                  );
                }
              )}
            </swiper>
          </div>
          <TitleLine
            showType="right"
            title="排行榜"
            btnName="更多"
            noPadding={true}
            icon="icon-qianjin1"
            style={{
              padding: "0 0.15rem",
            }}
            titleStyle={{
              letterSpacing: "0",
            }}
          />
          <div class="common-title">
            <span>为你定制的官方歌单</span>
          </div>
          <div class="RecomondSheet-dayre">
            <swiper slides-per-view="auto" space-between={8}>
              {sampleSize(officialData.value, 6).map(
                (item: RecomdSheetItem) => {
                  return (
                    <swiper-slide class="RecomondSheet-dayre-card">
                      <SongSheetCard sheetData={item} />
                    </swiper-slide>
                  );
                }
              )}
            </swiper>
          </div>
          <div class="common-title">
            <span>你可能喜欢</span>
          </div>
          <div class="RecomondSheet-ramdom">
            {sampleSize(sheetData.value, 12).map((item: RecomdSheetItem) => {
              return (
                <SongSheetCard
                  sheetData={item}
                  class="RecomondSheet-ramdom-card"
                />
              );
            })}
          </div>
        </div>
      );
    };
  },
});
