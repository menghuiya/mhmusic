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
      return (
        <div class="song-sheet-card" onClick={handleClick}>
          <div class="song-sheet-cover">
            <img
              src={props.sheetData.picUrl}
              alt={props.sheetData.name}
              class="cover-img"
            />
            <div class="cover-count">
              <i class="iconfont icon-bofang2"></i>
              {getShowNumber(props.sheetData.playCount)}
            </div>
          </div>
          <div class="song-sheet-desc">{props.sheetData.name}</div>
        </div>
      );
    };
  },
});
