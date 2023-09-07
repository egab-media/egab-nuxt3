<script lang="ts" setup>
import useAuth from '~/composables/auth/useAuth'

const { login } = useAuth()
</script>

<template>
  <h1>Login here</h1>
  <button @click="login({ email: 'admin@egab.co', password: '123456'})">login here</button>
</template>

<style scoped>

</style>
