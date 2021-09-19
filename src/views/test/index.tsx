import Progress from "@/components/Progress/Progress";
import { defineComponent, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "test",
  setup() {
    const show = ref(true);
    const percentage = ref(0);
    const changeShow = () => {
      show.value = !show.value;
    };
    const format = (percentage: number | string) => {
      return Number(percentage) === 100 ? "满" : `${percentage}%`;
    };
    const formatS = (percentage: number | string) => {
      const rate = Number(percentage);
      switch (true) {
        case rate <= 5:
          return "准备";
          break;
        case rate <= 20:
          return "开始";
          break;
        case rate <= 40:
          return "出门";
          break;
        case rate <= 50:
          return "进步";
          break;
        case rate <= 65:
          return "冲刺";
          break;
        case rate <= 80:
          return "接近";
          break;
        case rate <= 100:
          return "成功";
          break;
      }
    };

    const customColors = [
      { color: "#f56c6c", percentage: 20 },
      { color: "#e6a23c", percentage: 40 },
      { color: "#5cb87a", percentage: 60 },
      { color: "#1989fa", percentage: 80 },
      { color: "#6f7ad3", percentage: 100 },
    ];
    const customColorMethod = (percentage: number) => {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    };
    return () => {
      return (
        <div
          style={{
            fontSize: "0.36rem",
            position: "relative",
          }}
        >
          <div class="test-action">
            <div onClick={changeShow} class="test-action-text">
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
          <p>这里是圆的(粗细)：</p>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            strokeWidth="6"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            strokeWidth="5"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            strokeWidth="3"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            strokeWidth="1"
          />
          <hr />
          <p>这里是圆的(大小)：</p>
          <Progress percentage={percentage.value} showText={show.value} />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="100px"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="60px"
          />
          <hr />
          <p>这里是圆的(颜色单色)：</p>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            color="#6f7ad3"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            color="#e6a23c"
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            color="#67c23a"
          />
          <hr />
          <p>这里是圆的(颜色数组+函数)：</p>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            color={customColors}
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            color={customColorMethod}
          />

          <hr />
          <p>这里是圆的(不同进度显示文字)：</p>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            format={format}
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
            format={formatS}
          />
          <Progress
            percentage={percentage.value}
            showText={show.value}
            width="80px"
          />

          <hr />
          <p>仪表盘：</p>
          <Progress
            percentage={percentage.value}
            showText={show.value}
            type="dashboard"
            width="80px"
          />
        </div>
      );
    };
  },
});
