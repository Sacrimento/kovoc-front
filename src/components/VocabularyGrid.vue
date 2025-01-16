<script setup>
import { getVocabulary } from '@/utils/api'
import { ref, onMounted } from 'vue'
import Spinner from './LoadingSpinner.vue'

const vocab = ref([])
const currentPage = ref(1)
const totalPages = ref(0)

const loadingData = ref(true)

const refreshVocab = async () => {
  loadingData.value = true
  const resp = await getVocabulary(currentPage.value)
  vocab.value = resp.data.items
  loadingData.value = false
  return resp.data
}

onMounted(async () => {
  const data = await refreshVocab()
  totalPages.value = Math.ceil(data.total / data.limit)
})

const nextPage = async () => {
  currentPage.value++
  refreshVocab()
}
const prevPage = async () => {
  currentPage.value--
  refreshVocab()
}
</script>

<template>
  <h1>Vocabulary</h1>
  <div v-if="loadingData">
    <Spinner />
  </div>
  <div v-else class="items-list">
    <table>
      <thead>
        <tr>
          <th>Level</th>
          <th>English</th>
          <th>Korean</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vocab" :key="item.id">
          <td>{{ item.level }}</td>
          <td>{{ item.english }}</td>
          <td>{{ item.korean }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<style scoped>
.items-list {
  width: 80%;
  margin: auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead th {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #270505;
}

tbody td {
  border: 1px solid #ddd;
  padding: 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
