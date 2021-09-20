import Nav from "@/components/Nav/Nav";
import { PlayBoxState } from "@/utils/types";
import { defineComponent, inject, onBeforeUnmount, onMounted, ref } from "vue";
import "./index.scss";

export default defineComponent({
  name: "creatorCenter",
  setup() {
    const playBox = inject<PlayBoxState>("PlayBoxKey");
    onMounted(() => {
      playBox?.close();
    });
    onBeforeUnmount(() => {
      playBox?.open();
    });
    const logImg = require("@/assets/images/logo.png");

    return () => {
      return (
        <div class="creator-center">
          <Nav
            backStatus={true}
            iconSize="0.6rem"
            class="creator-center-nav"
            v-slots={{
              right: () => null,
              center: () => <span>创作者中心</span>,
            }}
          />
          <div class="creator-center-body">
            <div class="creator-center-body-card">
              <img src={logImg} alt="" class="creator-card-img" />
              <div class="creator-card-text">网易云达人</div>
            </div>
            <div class="creator-center-body-card">
              <img src={logImg} alt="" class="creator-card-img" />
              <div class="creator-card-text">云音乐达人</div>
            </div>
            <div class="creator-center-body-card">
              <img src={logImg} alt="" class="creator-card-img" />
              <div class="creator-card-text">LOOK主播</div>
            </div>
          </div>
        </div>
      );
    };
  },
});
