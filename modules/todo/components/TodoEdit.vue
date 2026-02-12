<script setup lang="ts">
import type { ITodoItem } from '~/types/todo'
import { useNotification } from '~/components/notification/useNotification'
import { useConfirmation } from '~/composables/shared/useConfirmation'
import TodoForm from '~/modules/todo/components/form/TodoForm.vue'
import { useTodoListStore } from '~/modules/todo/store/useTodo'

const todoListStore = useTodoListStore()
const router = useRouter()
const { setNotification } = useNotification()

function update(item: ITodoItem) {
  todoListStore.updateTodoItem(item)

  setNotification({
    type: 'success',
    text: 'Заметка успешно обновлена!',
  })
  router.push('/')
}

const confirmation = useConfirmation()

function submit(item: ITodoItem) {
  confirmation.revealConfirmation({
    subtitle: 'Вы действительно хотите изменить заметку?',
    onConfirm: () => update(item),
  })
}
</script>

<template>
  <TodoForm
    v-bind="todoListStore.currentTodo"
    @on-submit="submit"
  />
</template>

<style scoped lang="scss">
.todo {
  &__content {
    max-width: 600px;
  }
}
</style>
