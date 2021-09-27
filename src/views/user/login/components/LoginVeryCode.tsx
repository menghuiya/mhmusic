import { sureVeryCode, veryCodeLogin } from "@/api/login";
import Toast from "@/components/Toast";
import router from "@/router";
import store from "@/store";
import { userLoginItem } from "@/utils/types";
import {
  defineComponent,
  ref,
  Transition,
  computed,
  watch,
  nextTick,
} from "vue";
import "./common.scss";

export default defineComponent({
  name: "LoginVeryCode",
  props: {
    visible: Boolean,
    phoneAreaNo: {
      type: String,
      default: () => "86",
    },
    phoneNumber: {
      type: String,
      default: () => "12345678901",
    },
  },
  setup(props, { emit, slots }) {
    const length = [0, 1, 2, 3]; //只是用来展示
    const sendVeryCOde = ref(false);
    const veryCode = ref("");
    const inputEle = ref();
    const countDown = ref(60);
    const arrCode = computed(() => {
      return veryCode.value.split("");
    });
    const codeCurrentIndex = computed(() => {
      return veryCode.value.length;
    });

    const onVeryInput = () => {
      const { phoneNumber, phoneAreaNo } = props;
      if (codeCurrentIndex.value === length.length) {
        Toast.loading("正在登录");
        sureVeryCode(phoneNumber, veryCode.value, phoneAreaNo).then(
          (res: any) => {
            if (res.code === 200) {
              const loginData: userLoginItem = {
                phone: phoneNumber,
                countrycode: phoneAreaNo,
                captcha: veryCode.value,
              };
              store.dispatch("userLogin", loginData);
            } else {
              Toast.success("验证码错误");
            }
          }
        );
        // if (veryCode.value === "980306") {
        //   store.commit("setUserLogin");
        //   router.replace("/");
        // }
      }
    };

    const getVeryCode = () => {
      const { phoneNumber, phoneAreaNo } = props;
      veryCodeLogin(phoneNumber, phoneAreaNo).then((res: any) => {
        if (res.code === 200) {
          sendVeryCOde.value = true;
          Toast.clear();
          startCountDown();
        }
      });
    };

    watch(
      () => props.visible,

      (newvalue) => {
        if (newvalue) {
          nextTick(() => {
            inputEle.value.focus();
            if (!sendVeryCOde.value) {
              getVeryCode();
            }
          });
        } else {
          veryCode.value = "";
        }
      },
      {
        immediate: true,
      }
    );

    const startCountDown = () => {
      const time = setInterval(() => {
        --countDown.value;
        if (countDown.value === 0) {
          clearInterval(time);
        }
      }, 1000);
    };

    const reSendVerCode = () => {
      Toast.loading("正在重新发送");
      veryCode.value = "";
      countDown.value = 60;
      getVeryCode();
    };

    return () => {
      const { phoneAreaNo, phoneNumber } = props;
      return (
        <div class="veryCode">
          <div class="veryCode-tps">请输入验证码</div>
          <div class="veryCode-des">
            <div class="veryCode-des-left">
              已发送至
              <span class="veryCode-des-code">+{phoneAreaNo}</span>
              <span class="veryCode-des-number">
                {phoneNumber.replace(/(.{3}).*(.{4})/, "$1****$2")}
              </span>
              <i class="iconfont icon-qianming"></i>
            </div>
            <div class="veryCode-des-right">
              {countDown.value > 0 ? (
                <span>{countDown.value}S</span>
              ) : (
                <span class="veryCode-des-right-btn" onClick={reSendVerCode}>
                  重新发送
                </span>
              )}
            </div>
          </div>
          <div class="veryCode-input">
            <input
              type="tel"
              v-model={veryCode.value}
              maxlength={6}
              pattern="\d*"
              id="code"
              class="veryCode-input-code"
              onInput={onVeryInput}
              autocomplete="off"
              autofocus={true}
              ref={inputEle}
            />
            <div class="veryCode-input-labels">
              {length.map((item: number) => {
                return (
                  <label
                    class={[
                      "label",
                      codeCurrentIndex.value === item ? "active" : "",
                      arrCode.value[item] ? "inputed" : "",
                    ]}
                    for="code"
                  >
                    {arrCode.value[item]}
                  </label>
                );
              })}
            </div>
          </div>
          <div class="veryCode-stop">
            手机号已停用 <i class="iconfont icon-qianjin1"></i>
          </div>
        </div>
      );
    };
  },
});
