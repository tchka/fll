import axios from 'axios';
import { store } from '../store'

export default function setup(instance) {

    instance.interceptors.request.use(function(config) {
        const token = store.getters.getAuthToken;
        if(token) {
            config.headers.Authorization = `token ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
      });

    instance.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
      }, function (error) {
        return error.response;
      });
}