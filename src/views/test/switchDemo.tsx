import Switch from "@/components/Switch/Switch";
import { defineComponent, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "test",
  setup() {
    const switchStatus = ref(false);
    const changeData = ref("");
    const handleChange = (val: any) => {
      changeData.value = "change过后了" + val;
    };
    return () => {
      return (
        <div
          style={{
            fontSize: "0.36rem",
          }}
        >
          <p>默认</p>
          <Switch v-model={switchStatus.value} />
          <hr />
          <p>设置长度</p>
          <Switch v-model={switchStatus.value} width="2rem" />
          <Switch v-model={switchStatus.value} width="1.8rem" />
          <Switch v-model={switchStatus.value} width="1.5rem" />
          <Switch v-model={switchStatus.value} width="1.2rem" />
          <p>设置颜色</p>
          <Switch
            v-model={switchStatus.value}
            inactiveColor="#ff4949"
            activeColor="green"
          />
          <Switch
            v-model={switchStatus.value}
            inactiveColor="#f05b72"
            activeColor="#ef5b9c"
          />
          <Switch
            v-model={switchStatus.value}
            inactiveColor="#8e453f"
            activeColor="#fcaf17"
          />
          <Switch
            v-model={switchStatus.value}
            inactiveColor="#87843b"
            activeColor="#224b8f"
          />
          <Switch
            v-model={switchStatus.value}
            inactiveColor="#27342b"
            activeColor="#402e4c"
          />
          <hr />
          <p>设置状态</p>
          <Switch disable={true} />
          <hr />
          <p>change事件</p>
          <Switch v-model={switchStatus.value} onChange={handleChange} />{" "}
          <span>{changeData.value}</span>
        </div>
      );
    };
  },
});
