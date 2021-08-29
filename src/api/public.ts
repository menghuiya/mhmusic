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
