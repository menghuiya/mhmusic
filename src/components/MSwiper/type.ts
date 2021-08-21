import { AxiosRequestConfig, AxiosResponse } from "axios";

interface SwiperDateOptions {
  id?: number | string; //bannerid
  ecodeId?: string;
  name?: string;
  imgSrc?: string;
  src?: string; //scm
  showAdTag?: boolean;
  titleColor?: string;
  typeTitle?: string;
  url?:string;
}

interface BannerItems extends AxiosResponse {
  banners?: any;
}

export { SwiperDateOptions, BannerItems };
