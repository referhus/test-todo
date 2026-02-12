import { defineAsyncComponent } from 'vue'

import { useModal } from '~/composables/shared/useModal'
import type { ComponentProps } from "~/types";

export function useConfirmation() {
  const ConfirmDialog = defineAsyncComponent(
    () => import('~/components/modals/ConfirmDialog.vue'),
  )

  const modal = useModal()

  function revealConfirmation(
    propsComponent: ComponentProps<typeof ConfirmDialog>,
  ) {
    modal.open(ConfirmDialog, propsComponent)
  }

  return {
    revealConfirmation,
  }
}
