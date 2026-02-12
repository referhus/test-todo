<script setup lang="ts">
import { watch } from 'vue'

import { useModal } from '~/composables/shared/useModal'

const { isOpen, modalState, clearModalState } = useModal()

watch(isOpen, () => {
  if (!isOpen.value)
    clearModalState()
})
</script>

<template>
  <component
    :is="modalState.component"
    v-if="modalState.component"
    v-model="isOpen"
    v-bind="modalState.props"
  />
</template>
