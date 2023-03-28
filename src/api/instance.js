import axios from "axios"
import interceptorsSetup from './interceptors'
import { store } from '../store'


const instance = axios.create ({
    baseURL: 'http://fll2022.pythonanywhere.com',
    withCredentials: true,
});

export default instance