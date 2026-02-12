<script lang="ts" setup>
import type { ITodoTask } from '~/types/todo'
import AppButton from '~/components/shared/AppButton.vue'
import AppInput from '~/components/shared/input/AppInput.vue'
import TodoUndoRedo from '~/modules/todo/components/form/TodoUndoRedo.vue'
import { useForm } from '~/modules/todo/components/form/useForm'
import TodoTask from '~/modules/todo/components/TodoTask.vue'
import { getRandomId } from '~/utils/randomId'

const props = withDefaults(defineProps<{
  id?: number
  title?: string
  list?: ITodoTask[]
}>(), {
  id: getRandomId(),
  title: '',
  list: () => [],
})

const emit = defineEmits(['onSubmit'])

const {
  inputs,
  saveState,
  undo,
  redo,
  canUndo,
  canRedo,
  addTask,
  deleteTask,
  newTask,
} = useForm(props.title, props.list)
saveState()

const getDisabled = computed(() => {
  const isInitial = props.title === inputs.value.title && JSON.stringify(props.list) === JSON.stringify(inputs.value.list)
  const isEmpty = !inputs.value.title || !inputs.value.list?.length

  return isInitial || isEmpty
})

function submit() {
  emit('onSubmit', {
    id: props.id,
    title: inputs.value.title,
    list: inputs.value.list,
  })
}
</script>

<template>
  <form
    class="flex-item"
    @submit.prevent="submit"
  >
    <TodoUndoRedo
      :can-redo="canRedo"
      :can-undo="canUndo"
      @redo="redo"
      @undo="undo"
    />
    <AppInput
      v-model="inputs.title"
      placeholder="название"
    />
    <div class="flex-item gap-10">
      <TodoTask
        v-for="task in inputs.list"
        :id="id"
        :key="task.title"
        v-model="task.completed"
        :task="task"
        clearable
        @on-clear="deleteTask"
      />

      <AppInput
        v-model="newTask"
        placeholder="новая задача"
      />
      <AppButton
        outlined
        size="small"
        :disabled="!newTask"
        @click.prevent="addTask"
      >
        Добавить задачу
      </AppButton>
    </div>

    <AppButton
      type="submit"
      :disabled="getDisabled"
    >
      Сохранить
    </AppButton>
  </form>
</template>
