export const state = () => ({
    isRequestProcessing: false,
    categories: [],
    menuCategories: [],
    totalBuyers: 0,
    totalSellers: 0,
    totalTransaction: 0,
    latestReviews: 0,
});

// getters
export const getters = {
    isRequestProcessing(state) {
        return state.isRequestProcessing;
    },
    getCategories(state) {
        return state.categories;
    },
    getMenuCategories(state) {
        return state.menuCategories;
    },
    getReviews(state) {
        return state.latestReviews;
    },
    getTotalBuyers(state) {
        return state.totalBuyers;
    },
    getTotalSellers(state) {
        return state.totalSellers;
    },
    getTotalTransaction(state) {
        return state.totalTransaction;
    },
};

// mutations
export const mutations = {
    SET_REQUEST_PROCESSING(state, value) {
        state.isRequestProcessing = value;
    },
    SET_GLOBAL_STATE(state, value) {
        state.categories = value.categories;
        state.menuCategories = value.menuCategories;
        state.totalBuyers = value.totalBuyers;
        state.totalSellers = value.totalSellers;
        state.totalTransaction = value.totalTransaction;
        state.latestReviews = value.latestReviews;
    },
};

// actions
export const actions = {
    setRequestProcessing({ commit }, payload) {
        commit("SET_REQUEST_PROCESSING", payload);
    },
    async setGlobalState({ commit }, { url }) {
        try {
            const resConfig = await this.$axios.$post(url);
            commit("SET_GLOBAL_STATE", resConfig.data);
        } catch (error) {
            console.log(error);
        }
    }
};
