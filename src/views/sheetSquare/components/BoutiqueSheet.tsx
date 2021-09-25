import { getHighqualityPlayList, getPlayList } from "@/api/songSheet";
import LoadingCom from "@/components/Loading/LoadingCom";
import Popup from "@/components/Popup/Popup";
import SongSheetCard from "@/components/SongSheetCard/SongSheetCard";
import { RecomdSheetItem } from "@/views/home/components/types";
import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import "./common.scss";

export default defineComponent({
  name: "BoutiqueSheet",
  props: {
    show: Boolean,
    tag: {
      type: String,
      default: "",
    },
  },
  emits: ["screen"],
  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);
    const qureyOffset = ref(0);
    const isLoading = ref(false);
    const sheetBoxRef = ref();
    const getSheetData = () => {
      getHighqualityPlayList({
        order: "hot",
        cat: props.tag,
        limit: 30,
        before: sheetData.value.length
          ? sheetData.value[sheetData.value.length - 1].updateTime
          : undefined,
      }).then((res: any) => {
        if (res.playlists.length) {
          sheetData.value = sheetData.value.concat(...res.playlists);
        } else {
          qureyOffset.value = 4;
        }
        isLoading.value = false;
      });
    };

    const initHeight = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        sheetBoxRef.value.scrollTop;
      const targetHeight =
        sheetBoxRef.value.scrollHeight - sheetBoxRef.value.clientHeight;
      if (
        targetHeight <= scrollTop &&
        !isLoading.value &&
        qureyOffset.value < 4
      ) {
        isLoading.value = true;
        qureyOffset.value = qureyOffset.value + 1;
        setTimeout(() => {
          getSheetData();
        }, 500);
      }
    };

    watch(
      () => [props.show, props.tag],
      (newValue) => {
        if (newValue[1] || newValue[1] === "") {
          sheetData.value = [];
          qureyOffset.value = 0;
        }
        if (props.show && !sheetData.value.length) {
          isLoading.value = true;
          getSheetData();
        }
      }
    );
    onMounted(() => {
      nextTick(() => {
        sheetBoxRef.value.addEventListener("scroll", initHeight);
      });
    });
    onUnmounted(() => {
      if (sheetBoxRef.value) {
        sheetBoxRef.value.removeEventListener("scroll", initHeight);
      }
    });

    const screenClick = () => {
      emit("screen", true);
    };

    return () => {
      return (
        <div class="boutique">
          <div class="boutique-head">
            <div class="boutique-head-left">
              {props.tag === "" ? "全部精品" : props.tag}
            </div>
            <div class="boutique-head-right" onClick={screenClick}>
              筛选
            </div>
          </div>
          <div class="boutique-body" ref={sheetBoxRef}>
            <div class="boutique-body-data">
              {sheetData.value.length
                ? sheetData.value.map((item: RecomdSheetItem) => {
                    return (
                      <SongSheetCard
                        sheetData={item}
                        class="commonsheet-data-card"
                      />
                    );
                  })
                : null}
            </div>
            <LoadingCom v-show={isLoading.value} />
          </div>
        </div>
      );
    };
  },
});
