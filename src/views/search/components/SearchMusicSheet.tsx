import { defineComponent } from "vue";
import "./index.scss";

import { getShowNumber } from "@/utils/tool";
export default defineComponent({
  name: "SearchMusicSheet",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="sheet">
          {props.data && props.data.playlists
            ? props.data.playlists.map((item: any) => {
                return (
                  <div class="all-sheet-item">
                    <img
                      class="all-sheet-item-cover"
                      src={item.coverImgUrl}
                      alt=""
                    />
                    <div class="all-sheet-item-body">
                      <div class="item-body-name">{item.name}</div>
                      <div class="item-body-info">
                        {item.trackCount}首音乐 by {item.creator.nickname}
                        ，播放
                        {getShowNumber(item.playCount)}次
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      );
    };
  },
});
