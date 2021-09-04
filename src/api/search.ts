import request from "@/utils/request";

export function getSearchData(keywords: string, type = 1018, limit?: number) {
  return request({
    url: `/search`,
    method: "get",
    params: {
      keywords: keywords,
      type: type,
      limit: limit,
    },
  });
}
