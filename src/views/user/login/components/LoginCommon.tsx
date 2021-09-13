import { defineComponent, reactive, ref, Transition } from "vue";
import "./common.scss";

import Nav from "@/components/Nav/Nav";
import LoginAccount from "./LoginAccount";
import LoginVeryCode from "./LoginVeryCode";
import { accoutReItem } from "../type";
import LoginPassword from "./LoginPassword";
export default defineComponent({
  name: "LoginCommon",
  props: {
    visible: Boolean,
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const loginNav = reactive({
      title: "手机号码登录",
      step: 1,
    });
    const phoneAreaNo = ref("86");
    const phoneNumber = ref("18715890318");
    const veryCode = ref("");
    const phoneCheckState = ref(false);

    const handleClose = () => {
      if (loginNav.step === 1) {
        emit("close");
      }
      if (loginNav.step === 2) {
        loginNav.step = 1;
        loginNav.title = "手机号码登录";
      }
      if (loginNav.step === 3) {
        loginNav.step = 2;
        loginNav.title = "验证码登录";
      }
    };

    const handleNext = (data: accoutReItem) => {
      phoneAreaNo.value = data.phoneAreaNo;
      phoneNumber.value = data.phoneNumber;
      loginNav.step = 2;
      loginNav.title = "验证码登录";
    };

    const passLoginClick = () => {
      loginNav.step = 3;
      loginNav.title = "账号密码登录";
    };

    const handleLogin = (password: string) => {
      console.log(phoneNumber.value, password);
    };

    const renderSlotRight = (): JSX.Element | null => {
      if (loginNav.step === 2) {
        return (
          <div class="login-common-passwordlogin" onClick={passLoginClick}>
            密码登录
          </div>
        );
      } else {
        return null;
      }
    };

    return () => {
      const { visible } = props;
      return (
        <Transition name="login-common-fade">
          <div
            class={["login-common", visible ? "login-common-show" : ""]}
            v-show={visible}
          >
            <Nav
              leftIcon="icon-shanchu3"
              v-slots={{
                right: () => renderSlotRight(),
                center: () => (
                  <span class="login-common-title">{loginNav.title}</span>
                ),
              }}
              onLeftClick={handleClose}
            />
            <div v-show={loginNav.step === 1}>
              <LoginAccount visible={loginNav.step === 1} onNext={handleNext} />
            </div>
            <div v-show={loginNav.step === 2}>
              <LoginVeryCode
                visible={loginNav.step === 2}
                phoneAreaNo={phoneAreaNo.value}
                phoneNumber={phoneNumber.value}
              />
            </div>
            <div v-show={loginNav.step === 3}>
              <LoginPassword
                visible={loginNav.step === 3}
                onLogin={handleLogin}
              />
            </div>
          </div>
        </Transition>
      );
    };
  },
});
