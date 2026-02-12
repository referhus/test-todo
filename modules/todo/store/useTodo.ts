import type { ITodoItem } from '~/types/todo'

import { defineStore } from 'pinia'
import { tryLocalStorage } from '~/utils/tryLocalStorage'

export const useTodoListStore = defineStore('todo-list', () => {
  const todoList = ref<ITodoItem[] | null>(null)
  const currentTodo = ref<ITodoItem | null>(null)
  const isLoading = ref(true)

  function syncTodoListLocalStorage() {
    tryLocalStorage(() => localStorage.setItem('todoList', JSON.stringify(todoList.value)))
  }

  function setTodoList() {
    tryLocalStorage(() => {
      if (!localStorage?.getItem('todoList')) {
        isLoading.value = false
        return
      }

      todoList.value = JSON.parse(<string>localStorage.getItem('todoList')) || []
      isLoading.value = false
    })
  }

  function deleteTodoItem(id: number) {
    const index = todoList.value?.map((el: ITodoItem) => el.id).indexOf(Number(id))
    todoList.value.splice(index, 1)

    syncTodoListLocalStorage()
  }

  function addTodoItem(item: ITodoItem) {
    todoList.value.push({
      ...item,
    })

    syncTodoListLocalStorage()
  }

  function updateTodoItem(item: ITodoItem) {
    const index = todoList.value?.map((el: ITodoItem) => el.id).indexOf(Number(item.id))

    todoList.value.splice(index, 1, item)

    syncTodoListLocalStorage()
  }

  function setCurrentTodo(id: string) {
    currentTodo.value = todoList.value?.find((el: ITodoItem) => el.id === Number(id)) ?? null
    isLoading.value = false
  }

  return {
    todoList,
    currentTodo,
    addTodoItem,
    deleteTodoItem,
    updateTodoItem,
    setCurrentTodo,
    setTodoList,
    isLoading
  }
})
