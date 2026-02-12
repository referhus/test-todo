<script setup lang="ts">
import type { ICheckboxItem } from '~/components/shared/checkbox/types'

import { computed } from 'vue'
import { getActiveClass, getDisabledClass } from '~/utils/getClasses'
import { isContainerValue, isString } from '~/utils/is'

interface IProps extends ICheckboxItem {
  name: string
  value: string | boolean
  isDisabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isDisabled: false,
})

const modelValue = defineModel({
  default: ''
})

const checkModelValue = computed(() => {
  if (typeof modelValue.value === 'boolean') {
    return modelValue.value
  }
  else if (isString(modelValue.value) || isContainerValue(modelValue.value)) {
    return modelValue.value?.includes(String(props.value))
  }

  return false
})

const getClasses = computed(() => [
  {
    ...getDisabledClass(props.isDisabled),
    ...getActiveClass(checkModelValue.value),
  },
  '_small',
])
</script>

<template>
  <label
    class="checkbox-button"
    :class="getClasses"
  >
    <span class="checkbox-button__element">
      <input
        v-model="modelValue"
        :name="name"
        :value="value"
        type="checkbox"
      >
    </span>
    <span class="checkbox-button__label text_default">
      <slot name="default" />
    </span>
  </label>
</template>

<style scoped lang="scss">
.checkbox-button {
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  max-width: max-content;
  cursor: pointer;

  &__label {
    word-break: break-word;
  }

  &__element {
    flex-shrink: 0;
    display: flex;
    border-radius: 4px;
    background: transparent;
    border: 2px solid var(--color-secondary);

    input {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  }

  &._small {
    .checkbox-button__element {
      height: 15px;
      width: 15px;
    }
  }

  &:focus,
  &:focus-within {
    .checkbox-button__element {
      outline: 2px solid var(--ui-checkbox-focus-color);
    }
  }

  @media (hover: hover) and (min-width: 920px) {
    &:hover {
      &,
      & > * {
        color: var(--ui-checkbox-hover-color);
      }

      .checkbox-button__element {
        border-color: var(--ui-checkbox-hover-color);
      }
    }
  }

  &._active {
    .checkbox-button__element {
      border-color: var(--color-secondary);
      background: var(--color-secondary);
    }
  }

  &._disabled {
    opacity: 0.4;
    pointer-events: none;
  }
}
</style>
