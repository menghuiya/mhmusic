import { createStore } from "vuex";
import { getMusicWord } from "@/api/public";
import { LyricItem, userLoginItem } from "@/utils/types";
import { postLogin } from "@/api/login";
import router from "@/router";
import Toast from "@/components/Toast";

export default createStore({
  state: {
    playList: [] as any[],
    playCurrentIndex: null as any,
    playType: "sheet",
    lyric: "",
    playCurrentTime: 0,
    playTotalTime: 0,
    historySearch: [] as any[],
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  },
  getters: {
    lyricList(state) {
      const arr: LyricItem[] = state.lyric
        .trim()
        .split(/\n/gis)
        .map((item: string, index: number, orginArr: any) => {
          const min = parseInt(item.slice(1, 3));
          const sec = parseInt(item.slice(4, 6));
          const mill = parseInt(item.slice(7, 10));
          const time = min * 60 * 1000 + sec * 1000 + mill;
          const lyric = item.split("]")[1];
          let preTime = 0;
          let nextTime = 0;
          if (index > 0) {
            const lastItem: string = orginArr[index - 1];
            const lastmin = parseInt(lastItem.slice(1, 3));
            const lastsec = parseInt(lastItem.slice(4, 6));
            const lastmill = parseInt(lastItem.slice(7, 10));
            preTime = lastmin * 60 * 1000 + lastsec * 1000 + lastmill;
          }
          if (index <= orginArr.length - 1) {
            let nextItem = "";
            if (index === orginArr.length - 1) {
              nextItem = orginArr[index];
            } else {
              nextItem = orginArr[index + 1];
            }
            const nextmin = parseInt(nextItem.slice(1, 3));
            const nextsec = parseInt(nextItem.slice(4, 6));
            const nextmill = parseInt(nextItem.slice(7, 10));
            if (index === orginArr.length - 1) {
              nextTime = 9999999999;
            } else {
              nextTime = nextmin * 60 * 1000 + nextsec * 1000 + nextmill;
            }
          }
          return {
            min,
            sec,
            mill,
            time,
            lyric,
            preTime,
            nextTime,
          };
        });
      return arr;
    },
  },
  mutations: {
    setPlayList(state, value) {
      //设置搜索时点击的播放
      if (state.playType === "sheet") {
        //如果上一次时歌单播放 则全部清空
        state.playList = [];
      }
      const palayIndex = state.playList.findIndex(
        (item: any) => value.id === item.id
      );
      if (palayIndex !== -1) {
        state.playList.splice(palayIndex, 1);
      }
      state.playList.push(value);
      //这样设置时为了知道播放类型
      state.playType = "single";
      //设置播放位置index
      state.playCurrentIndex = state.playList.length - 1;
    },
    setSheetPlayList(state, value) {
      //设置歌单播放的点击播放其中一个 全部播放所有
      state.playList = value;
      state.playType = "sheet";
    },
    setPlayCurrntIndex(state, value) {
      state.playCurrentIndex = value;
    },
    setLyric(state, value) {
      state.lyric = value;
    },
    setPlayCurrentTime(state, value) {
      state.playCurrentTime = value;
    },
    setPlayTotalTime(state, value) {
      state.playTotalTime = value;
    },
    initSearchHistory(state) {
      state.historySearch = JSON.parse(
        localStorage.getItem("historySearch") || "[]"
      );
    },
    setSearchHistory(state, value) {
      const index = state.historySearch.findIndex((item) => item === value);
      //如果存在该关键词,删除该关键词并且重新加入到第一个
      if (index !== -1) {
        state.historySearch.splice(index, 1);
      }
      state.historySearch.unshift(value);
      localStorage.setItem(
        "historySearch",
        JSON.stringify(state.historySearch)
      );
    },
    clearSearchHistory(state) {
      state.historySearch = [];
      localStorage.removeItem("historySearch");
      //
    },
    setUserLogin(state, value) {
      localStorage.setItem("userInfo", JSON.stringify(value));
      state.userInfo = value;
    },
    setLogout(state) {
      localStorage.removeItem("userInfo");
      state.userInfo = {};
    },
  },
  actions: {
    async reqLyric(content, payload) {
      await getMusicWord(payload.id).then((res: any) => {
        if (res.nolyric) {
          content.commit("setLyric", "");
        } else {
          content.commit("setLyric", res.lrc.lyric);
        }
      });
    },
    userLogin(content, payload: userLoginItem) {
      postLogin(payload).then((res: any) => {
        const userData: any = {
          profile: res.profile,
          token: res.token,
          cookie: res.cookie,
          loginType: res.loginType,
          isLogin: true,
        };
        content.commit("setUserLogin", userData);
        router.replace("/");
        Toast.clear();
      });
    },
  },
  modules: {},
});
