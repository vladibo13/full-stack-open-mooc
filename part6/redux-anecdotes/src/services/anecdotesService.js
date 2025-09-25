import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
//   const object = { content, important: false }
  const response = await axios.post(baseUrl, content)
  return response.data
}

const voteUpdate = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`,content)
  return response.data
}

export default { getAll, create, voteUpdate }