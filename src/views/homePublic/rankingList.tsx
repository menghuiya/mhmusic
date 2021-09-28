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
    const sheetData = ref<RecomdSheetItem[]>([]);
    const logoimg = require("@/assets/images/logo.png");
    const sliderChange = (value: number) => {
      currentSliderId.value = value;
    };

    onMounted(() => {
      getRankList().then((res: any) => {
        sheetData.value = res.list;
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
                center: () => <span class="sheetcate-nav-title">排行榜</span>,
              }}
              backStatus={true}
            />
            <SliderNav sliderData={navData.value} onChange={sliderChange} />
          </div>
          <div class="mhrank-body">
            <div class="mhrank-body-recomm">
              <div class="common-title">
                <span>官方推荐</span>
              </div>
              <div class="mhrank-body-recomm-content">
                {sampleSize(sheetData.value, 3).map((item: RecomdSheetItem) => {
                  return (
                    <SongSheetCard
                      sheetData={item}
                      class="mhrank-body-recomm-card"
                    />
                  );
                })}
              </div>
            </div>
            <div class="common-title">
              <img src={logoimg} alt="" />
              <span>官方推荐</span>
            </div>
            <div class="mhrank-body-offcirank">33</div>
          </div>
        </div>
      );
    };
  },
});
