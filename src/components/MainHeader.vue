<script setup></script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo">Home</RouterLink>
    <div class="separator"></div>
    <nav class="nav-links">
      <RouterLink to="/vocabulary">Vocabulary</RouterLink>
      <RouterLink to="/quizz">Quizz</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.8rem 2rem;
  background: #ffffff10;
  border-bottom: 1px solid #ffffff2d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
}

.separator {
  width: 1px;
  height: 50%;
  background-color: #ffffff;
  margin: 0 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a:hover {
  transform: scale(1.2);
}
</style>
