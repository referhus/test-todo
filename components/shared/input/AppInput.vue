<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import { getDisabledClass } from '~/utils/getClasses'

const props = withDefaults(
  defineProps<{
    name?: string
    placeholder?: string
    label?: string
    isDisabled?: boolean
    isAutocomplete?: boolean
  }>(),
  {
    isDisabled: false,
    isAutocomplete: false,
  }
)

const attrs = useAttrs()

const modelValue = defineModel<string | number | undefined>({
  default: undefined
})

const autocomplete = computed(() => (props.isAutocomplete ? 'on' : 'off'))

function changeInput(e: InputEvent | Event) {
  modelValue.value = (e.target as HTMLInputElement).value
}

const getClasses = computed(() => ({
  ...getDisabledClass(props.isDisabled)
}))

const inputRef = ref(null)
</script>

<template>
  <div class="input__wrapper text_default">
    <label
      v-if="label"
      :for="name"
      class="input__label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      ref="inputRef"
      :name="name"
      v-bind="attrs"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      class="input"
      :class="getClasses"
      @input="changeInput($event)"
    >
  </div>
</template>

<style scoped lang="scss">
.input__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .input {
    height: 40px;
    padding: 5px 10px;
    border: 2px solid var(--color-secondary);
    border-radius: 8px;
    color: var(--color-secondary);
    background: var(--color-white);
    outline: none;

    &::placeholder {
      color: var(--color-primary);
    }

    &._disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  @media (hover: hover) and (min-width: 920px) {
    &:hover {
      .input:not(._disabled) {
        border-color: var(--color-primary);
      }
    }
  }
}
</style>
