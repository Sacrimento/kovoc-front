import Homepage from './components/HomePage.vue'
import QuizzLink from './components/QuizzLink.vue'
import VocabularyGrid from './components/VocabularyGrid.vue'

export const routes = [
  { path: '/', component: Homepage },
  { path: '/vocabulary', component: VocabularyGrid },
  { path: '/quizz', component: QuizzLink },
]
