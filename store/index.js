export const strict = false;

export const state = () => ({
  unreadNotification: false,
  loading: true
});

// getters
export const getters = {
  unreadNotification(state) {
    return state.unreadNotification;
  }
};

// mutations
export const mutations = {
  SET_UNREAD_NOTIFICATION(state, value) {
    state.unreadNotification = value;
  },
  DISABLE_LOADING(state) {
    state.loading = false;
  }
};

// actions
export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("settings/fetchSettings");
  },
  setUnreadNotification({ commit }, payload) {
    commit("SET_UNREAD_NOTIFICATION", payload);
  }
};
