<script setup lang="ts">
import ButtonDelete from '~/components/shared/ButtonDelete.vue'
import { useConfirmation } from '~/composables/shared/useConfirmation'
import { useTodoListStore } from '~/modules/todo/store/useTodo'
import { useNotification } from "~/components/notification/useNotification";

const props = defineProps<{
  id: number
}>()

const emit = defineEmits(['afterDelete'])

const todoListStore = useTodoListStore()

const confirmation = useConfirmation()
const { setNotification } = useNotification()

function deleteTodoItem() {
  todoListStore.deleteTodoItem(props.id)

  setNotification({
    type: 'success',
    text: 'Заметка успешно удалена!',
  })

  emit('afterDelete')
}
function openModal() {
  confirmation.revealConfirmation({
    subtitle: 'Вы действительно хотите удалить заметку?',
    onConfirm: () => deleteTodoItem(),
  })
}
</script>

<template>
  <ButtonDelete
    class="todo-delete"
    @click.prevent="openModal"
  />
</template>
