import { createStore } from 'vuex'

//export const store = () => {
    export const store = createStore({
        state: {
            backendUrl: 'https://fll2022.pythonanywhere.com/api/order',
            backendBaseUrl: 'https://fll2022.pythonanywhere.com',
            authToken: '',
            user: {},
            overlay: false,
            isAuthModal: false,
            isRegisterModal: false,
        },
        mutations: {
          setAuthToken: (state, payload) => {
            state.authToken = payload;
          },
          setUser: (state, payload) => {
            state.user = payload;
          },
          goAuthorized: (state, payload) => {
            state.authToken = payload;
          },
          setOverlay: (state, payload) => {
            state.overlay = payload;
          },
          setAuthModal: (state, payload) => {
            state.isAuthModal = payload;
          },
          setRegisterModal: (state, payload) => {
            state.isRegisterModal = payload;
          },
        },
        actions: {
          setAuthToken: (context, payload) => {
            context.commit('setAuthToken', payload);
          },
          setUser: (context, payload) => {
            context.commit('setUser', payload);
          },
          setOverlay: (context, payload) => {
            context.commit('setOverlay', payload);
          },
          setAuthModal: (context, payload) => {
            context.commit('setAuthModal', payload);
          },
          setRegisterModal: (context, payload) => {
            context.commit('setRegisterModal', payload);
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
            },
            getUser: state => {
                return state.user
            },
            getAuthModal: state => {
                return state.isAuthModal
            },
            getRegisterModal: state => {
                return state.isRegisterModal
            },
            getOverlay: state => {
                return state.overlay
            },
        },
    });
