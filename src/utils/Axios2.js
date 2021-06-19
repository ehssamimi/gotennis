import axios from "axios";
import {API_BASE_URL2} from "./Config";

let axios_instance = axios.create({
    baseURL: API_BASE_URL2,
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('GoTennisInfo')?JSON.parse(localStorage.getItem('GoTennisInfo')).token : ""
    }
});

export default axios_instance;