import Progress from "@/components/Progress/Progress";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "test",
  setup() {
    const show = ref(false);
    const percentage = ref(0);
    const changeShow = () => {
      show.value = !show.value;
    };
    const format = (percentage: number | string) => {
      return Number(percentage) === 100 ? "满" : `${percentage}%`;
    };
    const handleChange = (event: any) => {
      percentage.value = Number(event.target.value);
      // console.log(percentage.value, event.target.value);
    };

    return () => {
      return (
        <div>
          <span>圆圆：</span>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            format={format}
          />
          <span>仪表盘：</span>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            type="dashboard"
          />
          <div onClick={changeShow}>
            点我{show.value ? "关闭" : "显示"}进度文字
          </div>
          <input
            type="range"
            max="100"
            min="0"
            v-model={percentage.value}
            step="1"
          />
        </div>
      );
    };
  },
});
