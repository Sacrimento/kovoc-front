import axios from 'axios'

export const getVocabulary = async (page) => {
  const resp = axios.get('http://localhost:8000/vocabulary', {
    params: { page: page, limit: 10 },
  })
  return resp
}
