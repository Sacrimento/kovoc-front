import { getQuizzLink } from './api'

export const buildQuizzLink = async () => {
  const resp = await getQuizzLink()

  let answers = resp.data.answers
  let quizz = []
  let krWords = []
  let enWords = []

  for (const word of answers) {
    krWords.push(word.korean)
    enWords.push(word.english)
  }

  krWords = krWords
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  for (let index = 0; index < krWords.length; index++) {
    quizz.push({ korean: krWords[index], english: enWords[index] })
  }

  return { quizz, answers }
}
