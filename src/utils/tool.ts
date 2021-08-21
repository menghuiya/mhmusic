// //@ts-check
// /**
//  * @param {number} delay
//  */
// export function debounceFactory(delay: number) {
//   /**
//    * @param {() => void} callback
//    */
//   let timer: number | undefined = undefined;
//   return (callback: Function) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       callback();
//     }, delay);
//   };
// }

// /**
//  * @param {number} delay
//  */
// export function throttleFactory(delay: number) {
//   /**
//    * @param {() => void} callback
//    */
//   let preTime: number = Date.now();
//   return (callback: Function) => {
//     let nowTime = Date.now();
//     if (nowTime - preTime > delay) {
//       callback();
//       preTime = nowTime;
//     }
//   };
// }

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
