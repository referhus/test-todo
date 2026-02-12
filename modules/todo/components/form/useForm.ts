import type { ITodoTask } from '~/types/todo'
import { useDebounceFn } from '@vueuse/core'

export function useForm(title: string, list: ITodoTask[]) {
  const inputs = ref({
    title,
    list: list.map((task: ITodoTask) => ({
      title: task.title,
      completed: task.completed || false,
    })),
  })

  const newTask = ref('')

  const historyStates = ref<any[]>([])
  const historyIndex = ref(-1)

  let isApplyingHistory = false
  function saveState() {
    if (isApplyingHistory)
      return

    if (historyIndex.value < historyStates.value.length - 1) {
      historyStates.value = historyStates.value.slice(0, historyIndex.value + 1)
    }

    historyStates.value.push({
      title: inputs.value.title,
      list: inputs.value.list.map((task: ITodoTask) => ({
        title: task.title,
        completed: task.completed,
      })),
    })

    historyIndex.value++
  }

  function undo() {
    if (historyIndex.value > 0) {
      isApplyingHistory = true
      historyIndex.value--
      const state = historyStates.value[historyIndex.value]
      inputs.value = {
        title: state.title,
        list: state.list.map((task: ITodoTask) => ({
          title: task.title,
          completed: task.completed,
        })),
      }
      setTimeout(() => {
        isApplyingHistory = false
      }, 0)
    }
  }

  function redo() {
    if (historyIndex.value < historyStates.value.length - 1) {
      isApplyingHistory = true
      historyIndex.value++
      const state = historyStates.value[historyIndex.value]
      inputs.value = {
        title: state.title,
        list: state.list.map((task: ITodoTask) => ({
          title: task.title,
          completed: task.completed,
        })),
      }
      setTimeout(() => {
        isApplyingHistory = false
      }, 0)
    }
  }

  function addTask() {
    if (!newTask.value)
      return
    inputs.value.list.push({
      title: newTask.value,
      completed: false,
    })
    newTask.value = ''
  }

  function deleteTask(taskToDelete: ITodoTask) {
    const index = inputs.value.list.findIndex((task: ITodoTask) => task.title === taskToDelete.title)
    if (index !== -1) {
      inputs.value.list.splice(index, 1)
    }
  }

  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < historyStates.value.length - 1)

  const debouncedSaveState = useDebounceFn(() => {
    if (!isApplyingHistory) {
      saveState()
    }
  }, 500)

  watch(() => inputs.value.title, () => {
    if (isApplyingHistory)
      return
    debouncedSaveState()
  })

  watch(() => inputs.value.list, () => {
    saveState()
  }, { deep: true })

  return {
    inputs,
    canUndo,
    canRedo,
    undo,
    redo,
    addTask,
    deleteTask,
    newTask,
    saveState,
  }
}
