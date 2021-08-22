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
