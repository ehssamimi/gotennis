import axios from "axios";
import {API_BASE_URL} from "./Config";

let axios_instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Nonce: 'yXsi53vBe19znqSSV/F6cQ==:RzBhNmNLK3N4QmtTd3lDag==',
        Authorization: '$2y$12$XkZr2ko0b5wpPp5vLQQfAum8fcLjil0Pq/FjeZJb7gRh2d9mOfw0W'
    }
});

export default axios_instance;