import request from "@/utils/request";

/**
 * 获取歌单详情
 * @param id
 * @param s
 * @returns
 */
export function getSongSheetDetail(id: number, s = 8) {
  return request({
    url: `/playlist/detail`,
    method: "get",
    params: {
      id: id,
      s: s,
    },
  });
}
/**
 * 获取歌单详情 全部内容
 * @param ids
 * @returns
 */
export function getSongSheetDetailAll(ids: string) {
  return request({
    url: `/song/detail`,
    method: "get",
    params: {
      ids: ids,
    },
  });
}

type PlayListParmasOrder = "new" | "hot" | undefined;
interface PlayListParmas {
  cat?: string;
  order?: PlayListParmasOrder;
  limit?: number;
  offset?: number;
}

/**
 * 获取歌单
 * @param data
 * @returns
 */
export function getPlayList(data: PlayListParmas) {
  return request({
    url: `/top/playlist`,
    method: "get",
    params: data,
  });
}

/**
 * 获取歌单分类
 * @returns
 */
export function getPlayListCategory() {
  return request({
    url: `/playlist/catlist`,
    method: "get",
  });
}
