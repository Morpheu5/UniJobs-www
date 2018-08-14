import Vuex from 'vuex';
import cookieparser from 'cookieparser';

const createStore = () => {
    return new Vuex.Store({
        state: {
            unijobs_magic_token: null
        },
        mutations: {
            updateAuthToken(state, token = null) {
                state.unijobs_magic_token = token;
                if (token) {
                    this.$cookies.set('unijobs_magic_token', token);
                } else {
                    this.$cookies.remove('unijobs_magic_token');
                }
            }
        },
        actions: {
            nuxtServerInit({commit}, {req}) {
                let token = null;
                if (req.headers.cookie) {
                    const parsed = cookieparser.parse(req.headers.cookie);
                    token = parsed.unijobs_magic_token;
                }
                commit('updateAuthToken', token);
            }
        }
    })
};

export default createStore;