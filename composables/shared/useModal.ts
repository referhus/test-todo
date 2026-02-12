import type { Component } from 'vue'
import type { ModalProps } from '../../../types'

import type { ComponentProps } from '../types'
import { createSharedComposable } from '@vueuse/core'
import { ref, shallowRef } from 'vue'

export interface ModalState {
  component: Component | string
  props: ModalProps
}

function _useModal() {
  const modalState = shallowRef<ModalState>({
    component: '',
    props: {},
  })

  const isOpen = ref(false)

  function open<T extends Component>(
    component: T,
    props?: ModalProps & ComponentProps<T>,
  ) {
    modalState.value = {
      component,
      props: props ?? {},
    }
    isOpen.value = true
  }

  function clearModalState() {
    modalState.value = {
      component: '',
      props: {},
    }
  }

  return {
    isOpen,
    open,
    clearModalState,
    modalState,
  }
}

export const useModal = createSharedComposable(_useModal)
