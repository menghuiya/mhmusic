/**
 * 格式化播放量
 * @param num
 * @returns
 */
const getShowNumber = (num: number | undefined) => {
  let result = "";
  if (!num) {
    return "";
  }
  switch (true) {
    case num < 10000:
      result = num + "";
      break;
    case num < 100000000:
      result = (num / 10000).toFixed(2) + "万";
      break;
    case num > 100000000:
      result = (num / 100000000).toFixed(2) + "亿";
      break;
  }

  return result;
};

export { getShowNumber };
