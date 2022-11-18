import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = (person) => {
	return axios.post(baseUrl, person).then(res => res.data)
}

const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

const update = (person) => {
	return axios.put(`${baseUrl}/${person.id}`, person).then(res => res.data)
}

const personService = { getAll, create, delete: remove, update }
export default personService