<script setup>
import MainHeader from './components/MainHeader.vue'
</script>

<template>
  <MainHeader />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  place-items: center;
  padding-top: 4rem;
  max-width: calc(100vw - 4rem);
}
</style>
