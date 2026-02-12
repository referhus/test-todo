<script setup lang="ts">
import AppButton from '~/components/shared/AppButton.vue'
import AppLoader from '~/components/shared/AppLoader.vue'
import { useConfirmation } from '~/composables/shared/useConfirmation'
import TodoDelete from '~/modules/todo/components/TodoDeleteButton.vue'
import TodoEdit from '~/modules/todo/components/TodoEdit.vue'
import { useTodoListStore } from '~/modules/todo/store/useTodo'

const route = useRoute()
const todoListStore = useTodoListStore()
watch(() => route.path, () => {
  todoListStore.setCurrentTodo(route.params.todoId)
}, { immediate: true })

const router = useRouter()

function toList() {
  router.push('/')
}

const confirmation = useConfirmation()

function toCancel() {
  confirmation.revealConfirmation({
    subtitle: 'Вы действительно хотите отменить редактирование?',
    onConfirm: () => toList(),
  })
}
</script>

<template>
  <div class="page todo flex-item">
    <ClientOnly>
      <template v-if="todoListStore.currentTodo && !todoListStore.isLoading">
        <div class="container-head">
          <h1 class="text_big">
            Изменить заметку
          </h1>
          <TodoDelete
            :id="todoListStore.currentTodo.id"
            @after-delete="toList"
          />
        </div>
        <div class="todo__content flex-item gap-10">
          <TodoEdit />
          <AppButton
            outlined
            @click="toCancel"
          >
            Отменить редактирование
          </AppButton>
        </div>
      </template>
      <AppLoader v-else-if="todoListStore.isLoading" />
      <div
        v-else
        class="text_default"
      >
        Данной заметки не найдено. Вернитесь назад по кнопке выше и создайте заметку.
      </div>
      <template #fallback>
        <AppLoader />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.todo {
  max-width: 600px;
}
</style>
