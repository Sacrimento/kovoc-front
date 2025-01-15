<script setup>
defineProps({
  word: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['onClick'])
</script>

<template>
  <button
    @click="emit('onClick', word, lang)"
    :class="{
      selected: isSelected,
      completed: isCompleted,
    }"
  >
    {{ word }}
  </button>
</template>

<style scoped>
button {
  display: block;
  margin: 10px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button.selected {
  background-color: #4caf50;
}

button.completed {
  background-color: #05830b52;
  color: white;
  border: none;
}

button:hover {
  background-color: #4caf50;
}
</style>
