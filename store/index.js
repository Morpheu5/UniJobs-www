import cookieparser from 'cookieparser';

export const state = () => ({
    unijobs_magic_token: null,
    www_environment: null,
    www_version: null,
});

export const mutations = {
    updateAuthToken(state, token = null) {
        state.unijobs_magic_token = token;
        if (token) {
            this.$cookies.set('unijobs_magic_token', token);
        } else {
            this.$cookies.remove('unijobs_magic_token');
        }
    },
    www_environment(state, env = null) {
        state.www_environment = env;
    },
    www_version(state, ver = null) {
        state.www_version = ver;
    }
};

export const actions = {
    nuxtServerInit({commit}, {req}) {
        let token = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            token = parsed.unijobs_magic_token;
        }
        commit('updateAuthToken', token);
        commit('www_environment', process.env.NODE_ENV);
        commit('www_version', process.env.npm_package_version);
    }
};
