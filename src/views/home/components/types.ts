import { AxiosRequestConfig, AxiosResponse } from "axios";

interface MenuItem {
  id: number | string;
  name: string;
  icon: string;
  url?: string;
}

interface RecomdOptions extends AxiosResponse {
  result?: any;
}

interface RecomdSheetItem {
  [x: string]: any;
  updateFrequency?: any;
  coverImgUrl?: string;
  alg?: string;
  canDislike?: boolean;
  copywriter?: string;
  highQuality?: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount?: number;
  trackCount?: number;
  trackNumberUpdateTime?: number;
  type?: number;
  updateTime?: number;
  createTime?: number;
}

interface ArtistItem {
  id: number;
  name: string;
}

interface RecomdMvItem {
  alg?: string;
  artistId?: number;
  artistName?: string;
  artists?: ArtistItem[];
  canDislike?: boolean;
  copywriter?: string;
  duration?: number;
  id?: number;
  name?: string;
  picUrl?: string;
  playCount?: number;
  subed?: boolean;
  trackNumberUpdateTime?: string | null;
  type?: number;
}

export { MenuItem, RecomdOptions, RecomdSheetItem, RecomdMvItem };
