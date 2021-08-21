import request from "@/utils/request";

const env = process.env.NODE_ENV !== "production" ? "-dev" : "";

/**
 * 获取歌单详情
 * @param id
 * @param s
 * @returns
 */
export function getSongSheetDetail(id: number, s: number = 8) {
  return request({
    url: `/playlist/detail`,
    method: "get",
    params: {
      id: id,
      s: s,
    },
  });
}
