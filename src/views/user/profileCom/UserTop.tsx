import store from "@/store";
import { computed, defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  name: "UserTop",
  props: {
    visible: Boolean,
  },
  setup(props, { emit, slots }) {
    const userinfo = computed(() => store.state.userInfo);

    return () => {
      return (
        <>
          <div class="userbase">
            <div class="userbase-avatar">
              <img src={userinfo.value.profile.avatarUrl} alt="" />
            </div>
            <div class="userbase-info">
              <div class="userbase-info-head">
                <div class="info-head-item">
                  <div class="item-num">7</div>
                  <div class="item-name">粉丝</div>
                </div>
                <div class="info-head-item">
                  <div class="item-num">5</div>
                  <div class="item-name">关注</div>
                </div>
                <div class="info-head-item">
                  <div class="item-num">Lv.8</div>
                  <div class="item-name">等级</div>
                </div>
              </div>
              <div class="userbase-info-btn">编辑信息</div>
            </div>
          </div>
          <div class="usertag">
            <div class="usertag-item">
              <i class="iconfont icon-zengjia"></i>添加音乐标签
            </div>
          </div>
        </>
      );
    };
  },
});
