<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'

defineProps<{
  canUndo: boolean
  canRedo: boolean
}>()

const emits = defineEmits(['undo', 'redo'])
</script>

<template>
  <div class="container-head">
    <AppButton
      size="small"
      outlined
      :disabled="!canUndo"
      @click.prevent="emits('undo')"
    >
      ⮜ Отменить
    </AppButton>
    <AppButton
      size="small"
      outlined
      :disabled="!canRedo"
      @click.prevent="emits('redo')"
    >
      ⮞ Повторить
    </AppButton>
  </div>
</template>
