import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      user: null,
      userInfo: null,
      token: null
    }
  },
  mutations: {
    setUser(state, firebaseUser) {
      state.auth.user = firebaseUser;
    },
    setToken(state, firebaseToken) {
      state.auth.token = firebaseToken;
    },
    setUserInfo(state, userInfo) {
      state.auth.userInfo = userInfo;
    }
  },
  actions: {},
  modules: {}
});
