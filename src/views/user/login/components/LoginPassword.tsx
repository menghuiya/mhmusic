import Confirm from "@/components/Confirm";
import Toast from "@/components/Toast";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "LoginPassword",
  props: {
    visible: Boolean,
  },
  emits: ["login"],
  setup(props, { emit, slots }) {
    const password = ref("");

    const clear = () => {
      password.value = "";
    };

    const handleRightLogin = () => {
      if (!password.value) {
        Toast.fail("请输入密码");
        return false;
      }
      Toast.loading("正在登录");
      emit("login", password.value);
    };

    const handelForget = () => {
      Confirm.confirm({
        title: "梦回云音乐",
        message: "忘记功能密码暂未开开放",
        cancelButtonText: "重新输入密码",
        confirmButtonText: "换账号登陆",
        cancelButtonColor: "red",
      });
    };

    watch(
      () => props.visible,
      (value) => {
        if (!value) {
          password.value = "";
        }
      }
    );

    return () => {
      return (
        <div class="usepassword">
          <div class="usepassword-inputarea">
            <input
              type="password"
              placeholder="请输入密码"
              v-model={password.value}
              class="usepassword-inputarea-input"
            />
            <i
              class="iconfont icon-shanchu2"
              onClick={clear}
              v-show={password.value}
            ></i>
          </div>
          <div class="common-btn usepassword-btn" onClick={handleRightLogin}>
            立即登录
          </div>
          <div class="usepassword-forget" onClick={handelForget}>
            忘记密码<i class="iconfont icon-qianjin1"></i>
          </div>
        </div>
      );
    };
  },
});
