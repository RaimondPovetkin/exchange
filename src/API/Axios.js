import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.apilayer.com/exchangerates_data/convert`,
    params: {
        apikey: 'NGeUgFDVU38V1hvgSnMokm7ZMg8Go6F4'
    }
})

export default instance