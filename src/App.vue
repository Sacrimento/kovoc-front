<script setup>
import QuizzLink from './components/QuizzLink.vue'
import VocabularyGrid from './components/VocabularyGrid.vue'
</script>

<template>
  <header></header>

  <main>
    <QuizzLink level="1" />
    <Suspense><VocabularyGrid /></Suspense>
  </main>
</template>

<style scoped></style>
