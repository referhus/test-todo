<script setup lang="ts">
import { useConfirmDialog } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'

import AppButton from '../shared/AppButton.vue'
import AppModal from '../shared/modal/AppModal.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    textConfirm?: string
    textCancel?: string
    onConfirm?: () => void
    onCancel?: () => void
  }>(),
  {
    title: 'Подтвердите действие',
    subtitle: 'Вы уверены?',
    textConfirm: 'Подтвердить',
    textCancel: 'Отменить',
  },
)

const modalRef = useTemplateRef('modalRef')

const {
  confirm,
  cancel,
  reveal,
  onConfirm: _onConfirm,
  onCancel: _onCancel,
} = useConfirmDialog()

_onConfirm(() => {
  props.onConfirm?.()
  modalRef.value?.close()
})

_onCancel(() => {
  props.onCancel?.()
  modalRef.value?.close()
})

onMounted(async () => {
  await reveal()
})
</script>

<template>
  <AppModal
    ref="modalRef"
    :title="title"
    :subtitle="subtitle"
  >
    <div class="confirm-dialog flex-item">
      <p
        class="confirm-dialog-subtext text_default"
        v-html="subtitle"
      />

      <div class="confirm-dialog__buttons">
        <AppButton
          class="confirm-dialog__btn"
          size="big"
          @click="confirm"
        >
          {{ textConfirm }}
        </AppButton>
        <AppButton
          class="confirm-dialog__btn"
          size="big"
          outlined
          @click="cancel"
        >
          {{ textCancel }}
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>

<style scoped lang="scss">
.confirm-dialog {
  width: 100%;
  background-color: white;
  border-radius: 20px;

  &-subtext {
    color: grey;
  }

  &__buttons {
    width: 100%;
    display: flex;
    gap: 12px;
    justify-content: space-between;

    @media (max-width: 500px) {
      flex-direction: column;
      gap: 8px;
    }
  }

  &__btn {
    flex: 1;
  }
}
</style>
