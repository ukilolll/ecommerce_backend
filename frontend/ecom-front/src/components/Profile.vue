<template>
  <div class="profile">
    <h2>User Profile</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <p>{{ profile }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Reactive variables
const profile = ref({})
const loading = ref(false)
const error = ref(null)

// Function to fetch profile
const fetchProfile = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('/api') 
    profile.value = response.data
  } catch (err) {
    error.value = err.response?.data?.errorMsg
  } finally {
    loading.value = false
  }
}

// Fetch profile when component mounts
onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
.profile {
  padding: 20px;
}
</style>