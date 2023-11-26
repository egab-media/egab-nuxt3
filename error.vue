<script lang="ts" setup>
const error = useError()
</script>

<script lang="ts">
export default defineComponent({
  name: 'ErrorView'
})
</script>

<template>
  <NuxtLayout>
    <div class="prose">
      <h1>Dang!</h1>
      <p>
        <strong>{{ error.message }}</strong>
      </p>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
