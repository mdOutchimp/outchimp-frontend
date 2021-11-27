export const state = () => {
  return {
    settings: null
  };
};

export const getters = {
  getSettings(state) {
    return state.settings;
  }
};

export const mutations = {
  SET_SETTINGS(state, data) {
    state.settings = data;
  }
};

export const actions = {
  async fetchSettings(ctx) {
    const resSettings = await this.$axios.$post("/settings");
    ctx.commit("SET_SETTINGS", resSettings.data);
  }
};
