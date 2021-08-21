import { defineComponent, ref, onMounted } from "vue";
import MSwiper from "@/components/MSwiper/MSwiper.vue";
import { BannerItems, SwiperDateOptions } from "@/components/MSwiper/type";

import { getHomeBanners } from "@/api/home";

export default defineComponent({
  name: "HomeBanner",
  components: {
    MSwiper,
  },
  props: {},
  setup() {
    const swiperData = ref<SwiperDateOptions[]>([]);

    onMounted(() => {
      getHomeBanners(2).then((res: BannerItems) => {
        const tempData: SwiperDateOptions[] = [];

        res.banners.forEach((item: any) => {
          tempData.push({
            id: item.bannerId, //bannerid
            ecodeId: item.encodeId,
            imgSrc: item.pic,
            src: item.scm, //scm
            showAdTag: item.showAdTag,
            titleColor: item.titleColor,
            typeTitle: item.typeTitle,
            url: item.url,
          });
        });
        swiperData.value = tempData;
      });
    });
    return () => {
      return (
        <div>
          <MSwiper swiperData={swiperData.value} />
        </div>
      );
    };
  },
});
