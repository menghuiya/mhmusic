import { PropType } from "vue";

const PlayControlKey = "PlayControlKey";

interface PlayContenx {
  play(type: boolean): void; //播放音乐
  pause(): void; //暂停音乐
}
interface PlayBoxState {
  close(): void; //播放音乐
  open(): void; //暂停音乐
}

interface LyricItem {
  min?: string | number;
  sec?: string | number;
  mill?: string | number;
  time: number;
  preTime: number;
  nextTime: number;
  lyric?: string;
}

interface userLoginItem {
  phone: string;
  password?: string;
  md5_password?: string; //md5加密密码 传入时password失效
  captcha?: string; //验证码 传入时password失效
  email?: string;
  cookie?: string; //邮箱登录时使用
  countrycode?: string;
}

type CustomEventFuncType<T> = PropType<(arg: T) => void>;
type ClickEventFuncType = (item: any) => (e: Event) => void;

export {
  PlayContenx,
  PlayControlKey,
  CustomEventFuncType,
  LyricItem,
  ClickEventFuncType,
  PlayBoxState,
  userLoginItem,
};
