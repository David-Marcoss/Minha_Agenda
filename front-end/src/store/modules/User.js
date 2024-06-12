import axios from 'axios'

const state = {
    authData: {
        isAuthenticated: false,
        authToken: undefined,
        userId: undefined,
    },

    user: {
        id: null,
        email: null,
        name: null,
    },
};
const mutations = {

    setAuth(state, { token, userId }) {
        (state.authData.isAuthenticated = true), (state.authData.authToken = token);
        state.authData.userId = userId;

        localStorage.setItem("authData", JSON.stringify(state.authData));
    },

    loadAuth(state, authData) {
        state.authData = authData;
    },

    clearAuth(state) {
        (state.authData.isAuthenticated = false),
            (state.authData.authToken = undefined);
        state.authData.userId = undefined;

        localStorage.removeItem("authData");
    },
};

const actions = {
    async checkAuth({ commit }) {

        const apiUrl = process.env.VUE_APP_API_URL;
        const authData = JSON.parse(localStorage.getItem("authData"));

        if (authData) {
            try {
                await axios.get(apiUrl + "tokenValid", {
                    headers: {
                        Authorization: authData.authToken,
                    },
                });

                commit("loadAuth", authData);
            } catch (err) {
                commit("clearAuth");
            }
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}