<template>
  <Header />
  
  <div class="profile">
    <h2>User Profile</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <p>{{ profile }}</p>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/footer.vue'

const profile = ref({})
const loading = ref(false)
const error = ref(null)

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

onMounted(() => {
  fetchProfile()
})


</script>

<style scoped>
.profile {
  padding: 20px;
}
</style>