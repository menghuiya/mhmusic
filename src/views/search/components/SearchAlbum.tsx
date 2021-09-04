import { defineComponent } from "vue";

import CellItem from "@/components/Cell/CellItem";
import { getFormateData } from "@/utils/tool";
export default defineComponent({
  name: "SearchAlbum",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="album">
          {props.data && props.data.albums
            ? props.data.albums.map((item: any) => {
                return (
                  <CellItem
                    arrow={false}
                    style={{
                      padding: "0.15rem 0",
                      margin: "0 0.25rem",
                    }}
                    v-slots={{
                      icon: () => (
                        <img
                          class="album-item-cover"
                          src={item.picUrl}
                          alt=""
                        />
                      ),
                      title: () => (
                        <div>
                          <div class="album-item-name">{item.name}</div>
                          <div class="album-item-info">
                            {item.artists.map((art: any) => art.name).join("/")}
                            <span> </span>
                            {getFormateData(item.publishTime)}
                          </div>
                        </div>
                      ),
                    }}
                  ></CellItem>
                );
              })
            : null}
        </div>
      );
    };
  },
});
