import { getRecomdSheet } from "@/api/home";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import { RecomdOptions, RecomdSheetItem } from "@/views/home/components/types";
import { defineComponent, onMounted, ref } from "vue";
import "./common.scss";

export default defineComponent({
  name: "RecomondSheet",

  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);

    onMounted(() => {
      getRecomdSheet(20).then((res: RecomdOptions) => {
        sheetData.value = res.result;
      });
    });
    return () => {
      return (
        <div class="RecomondSheet">
          <div class="RecomondSheet-ramdom">
            {sheetData.value.map((item: RecomdSheetItem) => {
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
