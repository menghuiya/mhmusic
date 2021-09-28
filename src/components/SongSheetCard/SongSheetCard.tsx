import router from "@/router";
import { getShowNumber } from "@/utils/tool";
import { RecomdSheetItem } from "@/views/home/components/types";
import { defineComponent, PropType } from "vue";
import "./index.scss";

export default defineComponent({
  name: "SongSheetCard",
  props: {
    sheetData: {
      type: Object as PropType<RecomdSheetItem>,
      required: true,
    },
    origin: {
      type: String,
      default: "sheet",
    },
  },
  setup(props, { emit, slots }) {
    const handleClick = () => {
      const { sheetData } = props;
      router.push({
        path: "/sheetList",
        query: {
          id: sheetData.id,
        },
      });
    };
    return () => {
      const { sheetData, origin } = props;
      return (
        <div class="song-sheet-card" onClick={handleClick}>
          <div class="song-sheet-cover">
            <img
              v-imgLazy={sheetData.picUrl || sheetData.coverImgUrl}
              alt={sheetData.name}
              class="cover-img"
            />
            <div class="cover-count">
              {origin === "rank" ? null : <i class="iconfont icon-bofang2"></i>}

              {origin === "sheet"
                ? getShowNumber(sheetData.playCount)
                : sheetData.updateFrequency}
            </div>
          </div>
          <div class="song-sheet-desc">{sheetData.name}</div>
        </div>
      );
    };
  },
});
