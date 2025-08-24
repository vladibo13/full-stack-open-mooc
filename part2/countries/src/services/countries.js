import axios from "axios"
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(c => c.data)
}

export default {get}