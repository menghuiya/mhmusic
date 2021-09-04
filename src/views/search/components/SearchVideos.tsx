import { defineComponent } from "vue";
import { getShowNumber, getFormateTime } from "@/utils/tool";
import "./index.scss";

export default defineComponent({
  name: "SearchVideos",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="video">
          {props.data && props.data.videos ? (
            props.data.videos.map((item: any) => {
              return (
                <div class="video-item">
                  <div class="video-item-cover">
                    <img
                      class="video-item-cover-img"
                      src={item.coverUrl}
                      alt=""
                    />
                    <i class="iconfont icon-Controls-71"></i>
                  </div>
                  <div class="video-item-body">
                    <div class="video-item-body-name">{item.title}</div>
                    <div class="video-item-body-info">
                      {getFormateTime(item.playTime)} by{" "}
                      {item.creator.map((ct: any) => ct.userName).join("/")}
                      ，播放未知次
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>没有数据......</p>
          )}
        </div>
      );
    };
  },
});
