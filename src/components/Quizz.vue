<script setup>
import axios from 'axios'
import {ref} from 'vue'

defineProps({
  level: {
    type: String,
    required: true,
  },
})

let words = ref([])

let onClick = (koreanGuess, englishGuess) => {
  for (const {korean, english} of words.value) {
    if (korean == koreanGuess && english == englishGuess) {
      console.log("you win!!!")
      return
    }
  };
  alert("nul")
}

let quizz = ref([]);

axios
    .get('http://localhost:8000/quizz?level_eq=1')
    .then(response => {
      words.value = response.data.answers
      let krWords = []
      let enWords = []
      
      words.value.forEach(word => {
        krWords.push(word.korean)
        enWords.push(word.english)
      });

      krWords = krWords
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      
      for (let index = 0; index < krWords.length; index++) {
        quizz.value.push({korean: krWords[index], english: enWords[index]})
      }

    })

</script>

<template>
    <h1>Level: {{ level }}</h1>
    <div>
      <li v-for="word in quizz">
        <button @click="onClick(word.korean, word.english)">
          {{ word.english }} | {{ word.korean }}
        </button>
      </li>
    </div>
</template>

