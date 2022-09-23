import axios from "axios";

const instance = axios.create({
    baseURL: `https://www.amdoren.com/api/currency.php?api_key=B2QypBe2qEhJtPv9ag4iu79UPhrXhg`,
    headers: {"Access-Control-Allow-Origin": "*"}
})

export default instance