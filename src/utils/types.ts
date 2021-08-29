import { PropType } from "vue";

const PlayControlKey = "PlayControlKey";

interface PlayContenx {
  play(index: number): void;
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

export { PlayContenx, PlayControlKey, CustomEventFuncType, LyricItem };
