<script setup>
import { onMounted, ref } from 'vue'

import QuizzButton from './QuizzButton.vue'
import { buildQuizzLink } from '@/utils/buildQuizzLink'
import Spinner from './LoadingSpinner.vue'

defineProps({})

const loadingData = ref(true)

const selectedWord = ref(null)
const completed = ref([])
const quizz = ref([])
const answers = ref({})

onMounted(async () => {
  let tmp = await buildQuizzLink()
  quizz.value = tmp.quizz
  answers.value = tmp.answers
  loadingData.value = false
})

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
  for (const { korean, english } of answers.value) {
    if (korean === koreanGuess && english === englishGuess) {
      return true
    }
  }
  return false
}
</script>

<template>
  <h1>Quizz</h1>
  <div v-if="loadingData">
    <Spinner />
  </div>
  <div v-else class="quizz">
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
