import axios from 'axios'

export const getVocabulary = async (page) => {
  return axios.get('http://localhost:8000/vocabulary', {
    params: { page: page, limit: 10 },
  })
}

export const getQuizzLink = async () => {
  return axios.get('http://localhost:8000/quizz')
}
