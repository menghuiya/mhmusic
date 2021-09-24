import { getRecomdSheet } from "@/api/home";
import { getPlayList } from "@/api/songSheet";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import { sampleSize } from "@/utils/tool";
import { RecomdOptions, RecomdSheetItem } from "@/views/home/components/types";
import { defineComponent, onMounted, ref } from "vue";
import "./common.scss";

export default defineComponent({
  name: "RecomondSheet",

  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);
    const dayRecommdData = ref<RecomdSheetItem[]>([]);
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

    onMounted(() => {
      getRecommdData();
      getDayRecommdData();
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
            <swiper slides-per-view="auto" space-between={8} nested={true}>
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
        </div>
      );
    };
  },
});
