import { getRecomdSheet } from "@/api/home";
import { getPlayList } from "@/api/songSheet";
import Divider from "@/components/Divider/Divider";
import LoadingCom from "@/components/Loading/LoadingCom";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import TitleLine from "@/components/TitleLine/TitleLine";
import store from "@/store";
import { sampleSize } from "@/utils/tool";
import { RecomdOptions, RecomdSheetItem } from "@/views/home/components/types";
import { computed, defineComponent, onMounted, ref } from "vue";
import "./common.scss";

export default defineComponent({
  name: "RecomondSheet",

  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);
    const dayRecommdData = ref<RecomdSheetItem[]>([]);
    const officialData = ref<RecomdSheetItem[]>([]);
    const userName = computed(() => {
      if (store.state.userInfo && store.state.userInfo.profile) {
        return store.state.userInfo.profile.nickname;
      } else {
        return "梦回云音乐用户";
      }
    });
    const randIndex = Math.floor(Math.random() * 3);
    const firstTps = [
      `Hi${userName.value}，快来听听`,
      `${userName.value}的宝藏歌单`,
      `${userName.value}的专属歌单`,
    ];
    const secondTps = ["今日编辑推荐", "优质歌单甄选", "今日达人推荐"];
    const thirdTps = [
      "你可能喜欢",
      "这些歌单,你一定在找",
      "你对这些歌单有印象吗",
    ];

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
          {officialData.value.length &&
          dayRecommdData.value.length &&
          sheetData.value.length ? (
            <>
              <div class="common-title">
                <i class="iconfont icon-shuaxin1"></i>
                <span>{firstTps[randIndex]}</span>
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
                <span>{secondTps[randIndex]}</span>
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
                  fontSize: "0.43rem",
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
                <span>{thirdTps[randIndex]}</span>
              </div>
              <div class="RecomondSheet-ramdom">
                {sampleSize(sheetData.value, 12).map(
                  (item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="RecomondSheet-ramdom-card"
                      />
                    );
                  }
                )}
              </div>
              <Divider position="center">已经拉到底部啦！</Divider>
            </>
          ) : (
            <LoadingCom />
          )}
        </div>
      );
    };
  },
});
