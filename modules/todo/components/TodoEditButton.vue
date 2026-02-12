<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'
import EditIcon from '~/components/shared/icons/edit.vue'
</script>

<template>
  <AppButton
    class="button-edit"
    size="small"
    icon
    outlined
  >
    <EditIcon />
  </AppButton>
</template>

<style lang="scss" scoped>
.button-edit {
  flex-shrink: 0;
}
</style>