import { createStore } from "vuex";

export default createStore({
  state: {
    playLit: [] as any[],
    playCurrentIndex: 0,
  },
  mutations: {
    setPlayList: function(state, value) {
      state.playLit = value;
    },
    setPlayCurrntIndex: function(state, value) {
      state.playCurrentIndex = value;
    },
  },
  actions: {},
  modules: {},
});
