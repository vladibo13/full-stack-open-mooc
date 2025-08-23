import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const del = (id) => {
    return axios.delete(`baseUrl/${id}`)
}

export default {get, create}