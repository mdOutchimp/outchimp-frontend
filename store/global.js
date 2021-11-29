export const state = () => ({
    isRequestProcessing: false,
});

// getters
export const getters = {
    isRequestProcessing(state) {
        return state.isRequestProcessing;
    }
};

// mutations
export const mutations = {
    SET_REQUEST_PROCESSING(state, value) {
        state.isRequestProcessing = value;
    },
};

// actions
export const actions = {
    setRequestProcessing({ commit }, payload) {
        commit("SET_REQUEST_PROCESSING", payload);
    },
};
