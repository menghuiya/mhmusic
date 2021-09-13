import Toast from "@/components/Toast";
import router from "@/router";
import store from "@/store";
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
    const length = [0, 1, 2, 3, 4, 5]; //只是用来展示
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
      if (codeCurrentIndex.value === 6) {
        Toast.loading("正在登录");
        if (veryCode.value === "980306") {
          store.commit("setUserLogin");
          router.replace("/");
        }
      }
    };

    watch(
      () => props.visible,

      (newvalue) => {
        if (newvalue) {
          nextTick(() => {
            setTimeout(() => {
              inputEle.value.focus();
              startCountDown();
            }, 500);
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
            <div class="veryCode-des-right">{countDown.value}S</div>
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
