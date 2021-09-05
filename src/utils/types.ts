import { PropType } from "vue";

const PlayControlKey = "PlayControlKey";

interface PlayContenx {
  play(type: boolean): void; //播放音乐
  pause(): void; //暂停音乐
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

type CustomEventFuncType<T> = PropType<(arg: T) => void>;
type ClickEventFuncType = (item: any) => (e: Event) => void;

export {
  PlayContenx,
  PlayControlKey,
  CustomEventFuncType,
  LyricItem,
  ClickEventFuncType,
};
