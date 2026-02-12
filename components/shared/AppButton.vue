<script setup lang="ts">
import { computed } from 'vue'

type AppButtonSize = 'big' | 'medium' | 'small'
type AppButtonColor = 'primary'

interface AppButtonProps {
  size?: AppButtonSize
  disabled?: boolean
  color?: AppButtonColor
  outlined?: boolean
  icon?: boolean
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  size: 'medium',
  color: 'primary',
})

const classes = computed(() => [
  `app-button--${props.size}`,
  `app-button--${props.color}`,
  {
    'app-button--disabled': props.disabled,
    '_outlined': props.outlined,
    '_icon': props.icon,
  },
])
</script>

<template>
  <button
    class="app-button text_default"
    :class="classes"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid transparent;
  border-radius: 16px;
  box-sizing: border-box;
  text-align: center;
  transition: 0.3s;

  &--small {
    font-size: 14px;
    padding: 8px 20px;

    &._icon {
      width: 40px;
      height: 40px;
    }
  }

  &--medium {
    padding: 10px 20px;

    &._icon {
      width: 50px;
      height: 50px;
    }
  }

  &--big {
    padding: 14px 32px;
  }

  &--primary {
    background-color: var(--color-secondary);
    color: var(--color-primary);

    &._outlined {
      border-color: var(--color-secondary);
      background: var(--color-primary);
      color: var(--color-secondary);
    }

    @media (hover: hover) {
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-secondary);
        border-color: transparent;
      }
    }

    &:active {
      border-color: var(--color-secondary);
    }
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &._icon {
    padding: 10px !important;
  }
}
</style>
