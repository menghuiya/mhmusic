import request from "@/utils/request";

/**
 * 获取歌曲歌词
 * @param id
 * @returns
 */
export function getMusicWord(id: number) {
  return request({
    url: `/lyric`,
    method: "get",
    params: {
      id: id,
    },
  });
}

/**
 * 获取热搜列表
 * @param type
 * @returns
 */
export function getHotSearch() {
  return request({
    url: "/search/hot/detail",
    method: "get",
  });
}

/**
 * 获取默认搜索关键词
 * @returns
 */
export function getDefaultSearch() {
  return request({
    url: "/search/default",
  });
}

/**
 * 获取排行榜数据
 * @returns
 *
 */
export function getRankList() {
  return request({
    url: "/toplist/detail",
  });
}
