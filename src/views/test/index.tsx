import { defineComponent, reactive, ref, watch } from "vue";
import ProgressCom from "@/components/Progress/Progress";

export default defineComponent({
  name: "test",
  components: {
    ProgressCom,
  },
  setup(props, { emit }) {
    return () => {
      const rangeData = ref(0);
      const percentage = ref(10);
      const type = ref(false);
      const format = (percentage: number) => {
        return percentage === 100 ? "满" : `${percentage}%`;
      };
      const process = {
        showText: false,
      };

      const handleChange = (event: any) => {
        percentage.value = Number(event.target.value);
        console.log(percentage.value, event.target.value);
      };
      const handleClick = (event: any) => {
        // rangeData.value = rangeData.value + 1;
        console.log(process.showText);
        process.showText = !process.showText;
      };

      return (
        <div>
          <h3>测试进度条</h3>
          <ProgressCom
            percentage={rangeData.value}
            showText={process.showText}
          />
          <input
            type="range"
            max="100"
            min="0"
            value="0"
            step="1"
            onInput={handleChange}
          />

          <button onClick={handleClick}>加1</button>
          <hr />
        </div>
      );
    };
  },
});
