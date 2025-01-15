<script setup>
import axios from 'axios'
import { ref } from 'vue'

import QuizzButton from './QuizzButton.vue'

defineProps({
  level: {
    type: String,
    required: true,
  },
})

let words = ref([])

let selectedWord = ref(null)
let completed = ref([])
const selectWord = (word, lang) => {
  if (selectedWord.value === null) {
    selectedWord.value = { word: word, lang: lang }
  } else {
    if (selectedWord.value.word === word && selectedWord.value.lang === lang) {
      selectedWord.value = null
      return
    }
    if (selectedWord.value.lang === lang) return

    let english = null
    let korean = null

    if (selectedWord.value.lang === 'korean') {
      english = word
      korean = selectedWord.value.word
    } else {
      english = selectedWord.value.word
      korean = word
    }

    if (checkAnswer(korean, english) === true) {
      selectedWord.value = null
      completed.value.push(korean)
      completed.value.push(english)
    }
  }
}

const checkAnswer = (koreanGuess, englishGuess) => {
  for (const { korean, english } of words.value) {
    if (korean === koreanGuess && english === englishGuess) {
      return true
    }
  }
  return false
}

let quizz = ref([])

axios.get('http://localhost:8000/quizz?level_eq=1').then((response) => {
  words.value = response.data.answers
  let krWords = []
  let enWords = []

  words.value.forEach((word) => {
    krWords.push(word.korean)
    enWords.push(word.english)
  })

  krWords = krWords
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  for (let index = 0; index < krWords.length; index++) {
    quizz.value.push({ korean: krWords[index], english: enWords[index] })
  }
})
</script>

<template>
  <h1>Level: {{ level }}</h1>
  <div class="quizz">
    <div class="language-column">
      <div v-for="{ korean } in quizz" :key="{ korean }">
        <QuizzButton
          :word="korean"
          lang="korean"
          :isSelected="selectedWord?.word === korean"
          :isCompleted="completed.includes(korean)"
          @onClick="selectWord"
        />
      </div>
    </div>

    <div class="language-column">
      <div v-for="{ english } in quizz" :key="{ english }">
        <QuizzButton
          :word="english"
          lang="english"
          :isSelected="selectedWord?.word === english"
          :isCompleted="completed.includes(english)"
          @onClick="selectWord"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.quizz {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.language-column {
  width: 45%;
}
</style>
