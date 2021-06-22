import axios from "axios";
import {API_BASE_URL2} from "./Config";

let Token=localStorage.getItem('GoTennisInfo')?JSON.parse(localStorage.getItem('GoTennisInfo')).token : ""
// let Token=""
export const SetToken=(token)=>{
    Token=token
}

export const  Axios2 = axios.create({
    baseURL: API_BASE_URL2,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: Token,

        Accept:'application/json'
    }
});

Axios2.interceptors.request.use(function (config) {
    const token = (localStorage.getItem('GoTennisInfo') && JSON.parse(localStorage.getItem('GoTennisInfo')).token) ?

        JSON.parse(localStorage.getItem('GoTennisInfo')).token : null;

    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `${token}`;

    return config;
});

