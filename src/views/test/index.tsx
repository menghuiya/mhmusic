import { defineComponent, ref } from "vue";
import "./index.scss";
import Divider from "@/components/Divider/Divider";

export default defineComponent({
  name: "test",
  setup() {
    return () => {
      return (
        <div>
          上面的
          <Divider
            v-slots={{
              default: () => <span>中间的</span>,
            }}
          />
          <Divider position="left">左边的</Divider>
          <Divider position="right">右边的</Divider>
          <Divider position="center">
            <i class="iconfont icon-pingguo"></i>
          </Divider>
          <Divider position="center" dashed={true}>
            虚线的
          </Divider>
          <Divider
            position="center"
            style={{
              color: "#1989fa",
              borderColor: "#1989fa",
              padding: "0 16px",
            }}
          >
            自定义样式的
          </Divider>
          下面的
        </div>
      );
    };
  },
});
