<script setup lang="ts">
import type { ITodoItem } from '~/types/todo'
import { useNotification } from '~/components/notification/useNotification'
import AppModal from '~/components/shared/modal/AppModal.vue'
import TodoForm from '~/modules/todo/components/form/TodoForm.vue'
import { useTodoListStore } from '~/modules/todo/store/useTodo'

const todoListStore = useTodoListStore()
const { setNotification } = useNotification()

const modal = ref(null)
function submit(item: ITodoItem) {
  todoListStore.addTodoItem(item)
  setNotification({
    type: 'success',
    text: 'Заметка успешно создана!',
  })
  modal.value?.close()
}
</script>

<template>
  <AppModal
    ref="modal"
    title="Создать заметку"
  >
    <TodoForm @on-submit="submit" />
  </AppModal>
</template>
