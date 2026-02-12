<script lang="ts" setup>
import type { ITodoItem } from '~/types/todo'
import TodoDelete from '~/modules/todo/components/TodoDeleteButton.vue'
import TodoEdit from '~/modules/todo/components/TodoEditButton.vue'
import TodoTask from '~/modules/todo/components/TodoTask.vue'

defineProps<{
  item: ITodoItem
}>()

const router = useRouter()

function toEditPage(id: number) {
  router.push(`/todo-${id}`)
}
</script>

<template>
  <div class="todo-item flex-item gap-10">
    <div class="todo-item__head container-head">
      <div class="text_default">
        {{ item.title }}
      </div>
      <div class="todo-item__actions container-head">
        <TodoEdit @click="toEditPage(item.id)" />
        <TodoDelete :id="item.id" />
      </div>
    </div>
    <div class="todo-tasks">
      <TodoTask
        v-for="task in item.list.slice(0, 3)"
        :id="item.id"
        :key="task.title"
        v-model="task.completed"
        :task="task"
        is-disabled
      />
    </div>
  </div>
</template>

<style lang="scss">
.todo-item {
  position: relative;
  padding: 10px;
  border-radius: 6px;
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary);
  font-weight: 700;
  cursor: pointer;
}
</style>
