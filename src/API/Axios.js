import axios from "axios";

const instance = axios.create({
    baseURL: `https://v6.exchangerate-api.com/v6/8084f569e17e097a3e305091/latest/`})

export default instance