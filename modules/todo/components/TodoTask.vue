<script setup lang="ts">
import type { ITodoTask } from '~/types/todo'
import AppCheckbox from '~/components/shared/checkbox/AppCheckbox.vue'
import ButtonDelete from '~/components/shared/ButtonDelete.vue'

withDefaults(defineProps<{
  task: ITodoTask
  id: number
  clearable?: boolean
}>(), {
  clearable: false,
})

const emit = defineEmits(['onClear'])

function clear(item: ITodoTask) {
  emit('onClear', item)
}
</script>

<template>
  <AppCheckbox
    :name="`task-${id}`"
    :value="task.completed"
    class="todo-task"
  >
    <span class="todo-task__content flex-item gap-10">
      <span>
        {{ task.title }}
      </span>
      <ButtonDelete
        v-if="clearable"
        @click.prevent="clear(task)"
      />
    </span>
  </AppCheckbox>
</template>

<style lang="scss">
.todo-task {
  width: 100%;
  max-width: 100% !important;

  &__content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .checkbox-button__label {
    width: 100%;
  }
}
</style>
