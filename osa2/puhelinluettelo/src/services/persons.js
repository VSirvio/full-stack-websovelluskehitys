import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(resp => resp.data)

const create = newObj => axios.post(baseUrl, newObj).then(resp => resp.data)

const remove = id => axios.delete(`${baseUrl}/${id}`).then(resp => resp.data)

export default { getAll, create, remove }
