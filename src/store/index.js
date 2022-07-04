import { createStore } from 'vuex'

//export const store = () => {
    export const store = createStore({
        state: {
            backendUrl: 'https://fll2022.pythonanywhere.com/api/cp1',
            backendBaseUrl: 'https://fll2022.pythonanywhere.com',
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
            getBaseUrl: state => {
                return state.backendBaseUrl
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

//    return store;
//};

