import { getPlayList } from "@/api/songSheet";
import LoadingCom from "@/components/Loading/LoadingCom";
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
  name: "CommonSheet",
  props: {
    visible: Boolean,
    cat: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit, slots }) {
    const sheetData = ref<RecomdSheetItem[]>([]);
    const isLoading = ref(false);
    const sheetRef = ref();
    const qureyOffset = ref(0);
    const getSheetData = () => {
      getPlayList({
        order: "hot",
        cat: props.cat,
        limit: 30,
        offset: qureyOffset.value * 30,
      }).then((res: any) => {
        sheetData.value = sheetData.value.concat(...res.playlists);
        isLoading.value = false;
      });
    };

    watch(
      () => [props.visible, props.cat],
      (newValue) => {
        if (newValue[1] && props.visible) {
          sheetData.value = [];
        }
        if (props.visible && !sheetData.value.length) {
          isLoading.value = true;
          getSheetData();
        }
      }
    );
    const initHeight = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        sheetRef.value.scrollTop;

      const targetHeight =
        sheetRef.value.scrollHeight - sheetRef.value.clientHeight;
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

    onMounted(() => {
      nextTick(() => {
        sheetRef.value.addEventListener("scroll", initHeight);
      });
    });

    onUnmounted(() => {
      if (sheetRef.value) {
        sheetRef.value.removeEventListener("scroll", initHeight);
      }
    });

    return () => {
      return (
        <div class="commonsheet" ref={sheetRef}>
          <div class="commonsheet-data">
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
      );
    };
  },
});
