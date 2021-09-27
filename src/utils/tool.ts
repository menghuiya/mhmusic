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

const getFormateData = (num: number) => {
  const date = new Date(num);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

const getFormateTime = (num: number) => {
  const min = Math.floor(num / 60000);
  const sec = Math.floor((num % 60000) / 1000);
  return `${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
};

const getPlayForamtTime = (time: number) => {
  const min = Math.floor(time / 60);
  const sec = Number((time % 60).toFixed(0));
  return `${min > 9 ? min : "0" + min}:${sec > 9 ? sec : "0" + sec}`;
};

const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

export {
  getShowNumber,
  imgToBlob,
  getFormateData,
  getFormateTime,
  getPlayForamtTime,
  sampleSize,
};
