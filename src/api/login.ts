import request from "@/utils/request";
import { userLoginItem } from "@/utils/types";


/**
 * 登录
 * @param userData 
 * @returns 
 */
export function postLogin(userData:userLoginItem) {
  return request({
    url: `/login/cellphone`,
    method: "post",
    data:userData
  });
}

/**
 * 获取验证码
 * @param phone 
 * @param ctcode 
 * @returns 
 */
export function veryCodeLogin(phone:string,ctcode?:string) {
  return request({
    url: `/captcha/sent`,
    method: "post",
    data:{
      phone,
      ctcode
    }
  });
}

/**
 * 验证验证码
 * @param phone 
 * @param captcha 
 * @param ctcode 
 * @returns 
 */
export function sureVeryCode(phone:string,captcha:string,ctcode?:string) {
  return request({
    url: `/captcha/verify`,
    method: "post",
    data:{
      phone,
      ctcode,
      captcha
    }
  });
}

/**
 * 刷新登录
 * @returns 
 */
 export function reLogin() {
  return request({
    url: `/login/refresh`,
    method: "get",
  });
}

/**
 * 登录状态
 * @returns 
 */
 export function statusLogin() {
  return request({
    url: `/login/status`,
    method: "get",
  });
}



/**
 * 退出
 * @returns 
 */
export function logout() {
  return request({
    url: `/logout`,
    method: "post",
  });
}

