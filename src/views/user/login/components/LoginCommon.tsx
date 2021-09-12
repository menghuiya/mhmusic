import Nav from "@/components/Nav/Nav";
import Popup from "@/components/Popup/Popup";
import { defineComponent, onMounted, ref, Transition } from "vue";
import "./common.scss";
const phoneCountry = require("@/assets/country.json");

export default defineComponent({
  name: "LoginAccount",
  props: {
    visible: Boolean,
  },
  emits: ["close"],
  setup(props, { emit, slots }) {
    const phoneAreaNo = ref("86");
    const phoneNumber = ref("");
    const phoneCheckState = ref(false);

    const handleClose = () => {
      emit("close");
    };
    const clear = () => {
      phoneNumber.value = "";
    };
    const openCheckState = () => {
      phoneCheckState.value = true;
    };
    const closeCheckState = () => {
      phoneCheckState.value = false;
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
                right: () => null,
                center: () => <span class="account-title">手机号登录</span>,
              }}
              onLeftClick={handleClose}
            />
            <div class="account-body">
              <div class="account-body-tps">登录体验更多精彩</div>
              <div class="account-body-des">
                未注册手机号登录后将自动创建账号
              </div>
              <div class="account-body-phone">
                <div class="phone-code" onClick={openCheckState}>
                  <span class="phone-code-smalls">+</span>
                  {phoneAreaNo.value}
                  <span class="phone-code-smallt">▾</span>
                </div>
                <div class="phone-number">
                  <input
                    type="text"
                    placeholder="请输入手机号"
                    class="phone-number-input"
                    v-model={phoneNumber.value}
                    autofocus={true}
                  />
                  <i
                    class="iconfont icon-shanchu2"
                    onClick={clear}
                    v-show={phoneNumber.value}
                  ></i>
                </div>
              </div>
              <div
                class={[
                  "common-btn",
                  "account-body-btn",
                  phoneNumber.value ? "" : "disable",
                ]}
              >
                下一步
              </div>

              <Popup
                visible={phoneCheckState.value}
                onClose={closeCheckState}
                direction="bottom"
                title="选择国家和地区"
                style={{
                  height: "95%",
                  borderTopRightRadius: "0.25rem",
                  borderTopLeftRadius: "0.25rem",
                  padding: "0.25rem",
                }}
              ></Popup>
            </div>
          </div>
        </Transition>
      );
    };
  },
});
