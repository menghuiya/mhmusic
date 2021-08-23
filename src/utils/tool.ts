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

import glfx from "glfx";

/**
 * 图片转 base64
 * @param {String} url 图片链接
 * @param {Function} callback 回调
 * @param {Function} blur 模糊值
 * @param {Function} brightness 明亮值(0 ~ -1)
 */
const imgToBlob = (
  url: string,
  callback: any,
  blur: number | undefined,
  brightness: number | undefined
) => {
  const img = new Image();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = url;
  img.onload = () => {
    let canvas = null;
    if (blur === undefined || brightness === undefined) {
      canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    } else {
      canvas = glfx.canvas();
      const texture = canvas.texture(img);
      canvas
        .draw(texture)
        .lensBlur(blur, -1, 0)
        .brightnessContrast(brightness, 0)
        .update();
    }
    callback(canvas.toDataURL("image/jpeg", 0.8));
  };
};

export { getShowNumber, imgToBlob };
