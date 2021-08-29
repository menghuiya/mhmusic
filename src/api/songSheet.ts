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
