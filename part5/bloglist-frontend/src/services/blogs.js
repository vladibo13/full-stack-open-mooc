import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log(newToken)
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const {id} = updateBlog
  const response = await axios.put(`${baseUrl}/${id}`, updateBlog, config)
  return response.data
}



export default { getAll, create, setToken, update }