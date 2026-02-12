<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'
import AppLoader from '~/components/shared/AppLoader.vue'
import { useModal } from '~/composables/shared/useModal'
import CreateTodoModal from '~/modules/todo/components/modals/CreateTodoModal.vue'
import TodoList from '~/modules/todo/components/TodoList.vue'
import { useTodoListStore } from '~/modules/todo/store/useTodo'

const todoListStore = useTodoListStore()

const modal = useModal()
function openModal() {
  modal.open(CreateTodoModal)
}
</script>

<template>
  <div class="todo-content flex-item">
    <div class="todo-head container-head">
      <h1 class="text_big">
        Заметки
      </h1>

      <AppButton
        icon
        class="todo-head__button"
        @click="openModal"
      >
        +
      </AppButton>
    </div>
    <ClientOnly>
      <TodoList
        v-if="todoListStore.todoList?.length && !todoListStore.isLoading"
        :todo-list="todoListStore.todoList"
      />
      <AppLoader v-else-if="todoListStore.isLoading" />
      <div
        v-else
        class="text_default"
      >
        Заметок не найдено. Создайте по кнопке выше.
      </div>
      <template #fallback>
        <AppLoader />
      </template>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.todo-head {
  &__button {
    width: 50px;
  }
}
</style>
