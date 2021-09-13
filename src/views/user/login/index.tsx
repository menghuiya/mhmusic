import { PlayBoxState } from "@/utils/types";
import { defineComponent, inject, onBeforeUnmount, onMounted, ref } from "vue";
import "./index.scss";

import Confirm from "@/components/Confirm";
import router from "@/router";
import LoginAccount from "./components/LoginCommon";

export default defineComponent({
  name: "login",
  props: {},
  setup(props, { emit, slots }) {
    const accountVisible = ref(false);

    const playBox = inject<PlayBoxState>("PlayBoxKey");
    onMounted(() => {
      playBox?.close();
    });

    onBeforeUnmount(() => {
      playBox?.open();
    });

    const handleBack = () => {
      router.go(-1);
    };

    const rightExperience = () => {
      router.push({ path: "/" });
    };
    const rightLogin = () => {
      accountVisible.value = true;
    };
    const editAccuont = () => {
      accountVisible.value = true;
    };
    const closeAccount = () => {
      accountVisible.value = false;
    };

    const iconClick = () => {
      Confirm.confirm({
        title: "梦回云音乐",
        message: "暂未开通此快捷登录",
        cancelButtonText: "关闭",
        confirmButtonText: "账号登录",
        confirmButtonColor: "red",
      })
        .then(() => {
          console.log("账号登录");
        })
        .catch(() => {
          console.log("关闭了");
        });
    };
    const logImg = require("@/assets/images/logo.png");

    const renderLogin = () => {
      return (
        <div class="login">
          <div class="login-head">
            <i class="iconfont icon-shanchu3" onClick={handleBack}></i>
          </div>
          <div class="login-logo">
            <img src={logImg} alt="" class="login-logo-img" />
            <div class="login-logo-wave login-logo-wave1"></div>
            <div class="login-logo-wave login-logo-wave2"></div>
            <div class="login-logo-wave login-logo-wave3"></div>
          </div>
          <div class="login-content">
            <div class="login-content-head">
              <div class="phone">
                187····0154{" "}
                <i class="iconfont icon-qianming" onClick={editAccuont}></i>
              </div>
              <div class="phonedes">中国移动提供认证服务</div>
              <div class="next-button" onClick={rightLogin}>
                一键登录
              </div>
              <div class="now-button" onClick={rightExperience}>
                立即体验
              </div>
            </div>

            <div class="login-content-body">
              登录即已同意
              <span>《服务条款》</span>
              <span>《隐私政策》</span>
              <span>《儿童隐私政策》</span>
              <span>《中国移动认真服务协议》</span>
            </div>

            <div class="login-content-footer">
              <div class="login-weixin range" onClick={iconClick}>
                <i class="iconfont icon-weixin"></i>
              </div>
              <div class="login-qq range" onClick={iconClick}>
                <i class="iconfont icon-QQ"></i>
              </div>
              <div class="login-weibo range" onClick={iconClick}>
                <i class="iconfont icon-weibo"></i>
              </div>
              <div class="login-ios" onClick={iconClick}>
                <i class="iconfont icon-pingguo"></i>
                <span>通过Apple登录</span>
              </div>
              <div class="login-yi range" onClick={iconClick}>
                <i class="iconfont icon-mh-wangyi"></i>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return () => {
      return (
        <>
          {renderLogin()}
          <LoginAccount visible={accountVisible.value} onClose={closeAccount} />
        </>
      );
    };
  },
});
