import { defineAsyncComponent } from 'vue'

import { useModal } from '~/composables/shared/useModal'

export function useConfirmation() {
  const ConfirmDialog = defineAsyncComponent(
    () => import('~/components/modals/ConfirmDialog.vue'),
  )

  const modal = useModal()

  function revealConfirmation(
    propsComponent: any,
  ) {
    modal.open(ConfirmDialog, propsComponent)
  }

  return {
    revealConfirmation,
  }
}
