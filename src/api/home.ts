import request from "@/utils/request";

const env = process.env.NODE_ENV !== "production" ? "-dev" : "";

/**
 * 获取首页bannaer数据
 * @param type  0: pc 1: android 2: iphone 3: ipad
 * @returns
 */
export function getHomeBanners(type: number) {
  return request({
    url: `/banner`,
    method: "get",
    params: {
      type: type,
    },
  });
}

/**
 * 获取推荐歌单
 * @param limit
 * @returns
 */
export function getRecomdSheet(limit: number) {
  return request({
    url: `/personalized`,
    method: "get",
    params: {
      limit: limit,
    },
  });
}

/**
 * 获取推荐视频
 * @param offset
 * @returns
 */
export function getRecomdVideos(offset: number) {
  return request({
    url: `/personalized/mv`,
    method: "get",
    params: {
      offset: offset,
    },
  });
}
