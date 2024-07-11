import axios from 'axios';

const baseUrl = 'http://localhost/api'

const getPuzzle = async (id) => {
  const response = await axios.get(`${baseUrl}/generate-puzzle`)
  return response.data
}

const create = async (data) => {
  await axios.post(`${baseUrl}/puzzle`, data);
}

export default { 
    getPuzzle,
    create,
    baseUrl
}
