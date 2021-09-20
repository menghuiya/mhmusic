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
    const wangyiCloudTalent = require("@/assets/images/creator-1.png");
    const cloudMusicTalent = require("@/assets/images/creator-2.png");
    const lookAnchor = require("@/assets/images/creator-3.png");
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
              <img src={wangyiCloudTalent} alt="" class="creator-card-img" />
              <div class="creator-card-text">网易云达人</div>
            </div>
            <div class="creator-center-body-card">
              <img src={cloudMusicTalent} alt="" class="creator-card-img" />
              <div class="creator-card-text">云音乐达人</div>
            </div>
            <div class="creator-center-body-card">
              <img src={lookAnchor} alt="" class="creator-card-img" />
              <div class="creator-card-text">LOOK主播</div>
            </div>
          </div>
        </div>
      );
    };
  },
});
