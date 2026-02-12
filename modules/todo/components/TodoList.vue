<script setup lang="ts">
import type { ITodoItem } from '~/types/todo'
import TodoItem from '~/modules/todo/components/TodoItem.vue'

defineProps<{
  todoList: ITodoItem
}>()
</script>

<template>
  <div class="todo-list">
    <TodoItem
      v-for="item in todoList"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--default-gap);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
</style>