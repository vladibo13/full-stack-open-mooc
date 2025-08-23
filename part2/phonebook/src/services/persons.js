import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

export default {get, create}