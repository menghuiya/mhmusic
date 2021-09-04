import { defineComponent } from "vue";

import CellItem from "@/components/Cell/CellItem";

export default defineComponent({
  name: "SearchUser",
  props: {
    data: Object,
  },
  setup(props, { emit, slots }) {
    return () => {
      return (
        <div class="muser">
          {props.data && props.data.userprofiles
            ? props.data.userprofiles.map((item: any) => {
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
                          class="user-item-cover"
                          src={item.avatarUrl}
                          alt=""
                        />
                      ),
                      title: () => (
                        <div>
                          <div class="user-item-name">{item.nickname}</div>
                          <div class="user-item-fans">{item.signature}</div>
                        </div>
                      ),
                      right: () => (
                        <div class="user-item-btn">
                          <i class="iconfont icon-zengjia user-item-btn-add"></i>
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
