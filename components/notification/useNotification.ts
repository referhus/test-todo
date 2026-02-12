import { defineStore } from 'pinia'

export interface INotification {
  type: 'success' | 'error'
  text: string
}

export const useNotification = defineStore('notification', () => {
  const notifications = ref<INotification[]>([])

  function setNotification(data: INotification) {
    const id = notifications.value.length + 1
    notifications.value.push({
      ...data,
      id,
    })

    setTimeout(() => {
      closeNotification()
    }, 3000)
  }

  function closeNotification() {
    notifications.value.shift()
  }

  return {
    notifications,
    setNotification,
    closeNotification,
  }
})
