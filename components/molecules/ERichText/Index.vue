<script lang="ts">
export default defineComponent({
  name: 'ERichText',
  props: {},
  data: () => ({
    content: '',
    hideToolbar: false,
    disableToolbar: false,
    outlined: true,
    dense: true,
    errorMessages: undefined,
    maxWidth: 900,
    extensions: []
  })
})
</script>

<template>
  <client-only>
    <vuetify-tiptap
      v-model="content"
      label="Title"
      :hide-toolbar="hideToolbar"
      :disable-toolbar="disableToolbar"
      :outlined="outlined"
      :dense="dense"
      :error-messages="errorMessages"
      rounded
      :height="300"
      :max-height="465"
      :max-width="maxWidth"
      :extensions="extensions"
    />
  </client-only>
</template>

<style scoped>

</style>
