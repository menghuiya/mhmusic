import { defineComponent } from "vue";

import CellItem from "@/components/Cell/CellItem";
export default defineComponent({
  name: "SearchSinger",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="singer">
          {props.data && props.data.artists
            ? props.data.artists.map((item: any) => {
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
                          class="singer-item-cover"
                          src={item.picUrl}
                          alt=""
                        />
                      ),
                      title: () => (
                        <div>
                          <div class="singer-item-name">
                            {item.name}
                            {item.trans ? `(${item.trans})` : null}
                          </div>
                          <div class="singer-item-fans">粉丝：无数据</div>
                        </div>
                      ),
                      right: () => (
                        <div class="singer-item-btn">
                          <i class="iconfont icon-zengjia singer-item-btn-add"></i>
                          <span>关注</span>
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
