<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

import { freezeScroll as setFreezeScroll } from '~/utils/scroll'

defineProps<{
  title?: string
  subtitle?: string
}>()
const emit = defineEmits(['close'])
const isOpen = defineModel<boolean>({ default: false })

function close() {
  isOpen.value = false

  setFreezeScroll(false)

  emit('close')
}

watch(
  isOpen,
  () => {
    setFreezeScroll(isOpen.value, {
      htmlOverflow: true,
      saveScrollGutter: true,
    })
  },
  {
    immediate: true,
  },
)

const route = useRoute()
watch(
  () => route.path,
  () => {
    setFreezeScroll(false)
  },
)

const mouseDownTrigger = shallowRef<HTMLElement | null>(null)
function onMouseDown(e: MouseEvent) {
  mouseDownTrigger.value = e.target as HTMLElement
}

function onMouseUp(e: MouseEvent) {
  if (!mouseDownTrigger.value?.contains(e.target as Node))
    return

  close()
}

onBeforeUnmount(() => {
  setFreezeScroll(false)
})

defineExpose({
  close,
})
</script>

<template>
  <div
    v-if="isOpen"
    class="app-modal overlay"
    @mousedown.self="onMouseDown"
    @mouseup.self="onMouseUp"
  >
    <slot
      name="overlay"
      v-bind="{ close }"
    />
    <div class="app-modal__container">
      <div class="app-modal__wrapper flex-item">
        <div class="app-modal__head">
          <p
            class="app-modal__title text_big"
          >
            <slot name="title">
              <p
                v-if="title"
                v-html="title"
              />
            </slot>
          </p>
        </div>

        <div class="app-modal__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-modal {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    position: relative;
    overflow: hidden;
  }

  &__wrapper {
    position: relative;
    max-width: 100%;
    width: 500px;
    max-height: 98dvh;
    overflow-y: auto;
    padding: 20px;
    background-color: white;
    border-radius: 20px
  }

  &__title {
    max-width: 97%;
    width: 100%;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 800;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.80);
}
</style>
