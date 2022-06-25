import { createStore } from 'vuex'

export const store = () => {
    const store = createStore({
        state: {
            backendUrl: 'http://127.0.0.1:8000/api/cp1',
            authToken: '',
        },
        mutations: {
          setAuthToken: (state, payload) => {
            state.authToken = payload;
          },
        },
        actions: {
          setAuthToken: (context, payload) => {
            context.commit('setAuthToken', payload);
          },
        },
        modules: {},
        getters: {
            getServerUrl: state => {
                return state.backendUrl
            },
            getAuthToken: state => {
                return state.authToken
            }
        },
    });

/*    store.subscribe((setAuthToken, state) => {
        if (state.authToken) {
            localStorage.setItem('auth_token', state.authToken);
        } else {
            localStorage.removeItem('auth_token');
        }
    });*/

    return store;
};

