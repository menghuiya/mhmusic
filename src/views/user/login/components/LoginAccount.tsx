import { defineComponent, ref, watch } from "vue";
import "./common.scss";
import { ClickEventFuncType } from "@/utils/types";

import Popup from "@/components/Popup/Popup";
import { CountryItem } from "../type";
import Toast from "@/components/Toast";
const phoneCountry = require("@/assets/country.json");
export default defineComponent({
  name: "LoginAccount",
  props: { visible: Boolean },
  emits: ["next"],
  setup(props, { emit, slots }) {
    const phoneAreaNo = ref("86");
    const phoneNumber = ref("");
    const phoneCheckState = ref(false);

    const clear = () => {
      phoneNumber.value = "";
    };
    const openCheckState = () => {
      phoneCheckState.value = true;
    };
    const closeCheckState = () => {
      phoneCheckState.value = false;
    };

    const handleSelectCode: ClickEventFuncType = (item: CountryItem) => (e) => {
      phoneAreaNo.value = item.phoneCode;
      phoneCheckState.value = false;
    };

    const handleNext = () => {
      if (!phoneNumber.value) {
        return false;
      }
      const result = /^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber.value);
      if (!result) {
        Toast.fail("手机号格式不正确");
        return;
      }

      emit("next", {
        phoneAreaNo: phoneAreaNo.value,
        phoneNumber: phoneNumber.value,
      });
    };

    watch(
      () => props.visible,
      (newValue) => {
        if (newValue) {
          phoneNumber.value = "";
        }
      }
    );

    return () => {
      return (
        <div class="account-body">
          <div class="account-body-tps">登录体验更多精彩</div>
          <div class="account-body-des">未注册手机号登录后将自动创建账号</div>
          <div class="account-body-phone">
            <div class="phone-code" onClick={openCheckState}>
              <span class="phone-code-smalls">+</span>
              {phoneAreaNo.value}
              <span class="phone-code-smallt">▾</span>
            </div>
            <div class="phone-number">
              <input
                type="tel"
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
            onClick={handleNext}
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
              padding: "0.35rem",
            }}
            v-slots={{
              default: () => {
                return phoneCountry.map((item: CountryItem) => {
                  return (
                    <div class="phone-select" onClick={handleSelectCode(item)}>
                      <span class="phone-select-areaname">
                        {item.countryOrArea}
                      </span>
                      <span class="phone-select-code">+{item.phoneCode}</span>
                    </div>
                  );
                });
              },
            }}
          ></Popup>
        </div>
      );
    };
  },
});
