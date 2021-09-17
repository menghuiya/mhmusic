import request from "@/utils/request";

/**
 * 获取用户歌单
 * @param uid
 * @param offset
 * @param limit
 * @returns
 */
export function getUserSheet(uid: number, offset?: number, limit?: number) {
  return request({
    url: `/user/playlist`,
    method: "get",
    params: {
      uid,
      offset,
      limit,
    },
  });
}

/**
 * 获取用户vip信息
 * @returns
 */
export function getUserVipinfo() {
  return request({
    url: `/vip/info`,
    method: "get",
  });
}
