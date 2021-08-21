import { getShowNumber } from "@/utils/tool";
import { RecomdSheetItem } from "@/views/home/components/types";
import { defineComponent, PropType } from "vue";
import "./index.scss";

export default defineComponent({
  name: "SongSheetCard",
  props: {
    mvData: {
      type: Object as PropType<RecomdSheetItem>,
      required: true,
    },
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="song-video-card">
          <div class="song-video-cover">
            <img
              src={props.mvData.picUrl}
              alt={props.mvData.name}
              class="cover-img"
            />
            <div class="cover-count">
              <i class="iconfont icon-bofang2"></i>
              {getShowNumber(props.mvData.playCount)}
            </div>
          </div>
          <div class="song-video-desc">{props.mvData.name}</div>
        </div>
      );
    };
  },
});
