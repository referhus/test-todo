<script lang="ts" setup>
import AppNotification from '~/components/notification/AppNotification.vue'
import { useTodoListStore } from '~/modules/todo/store/useTodo'

const AppModalContainerClient = defineAsyncComponent(
  () => import('./components/shared/modal/AppModalContainer.client.vue'),
)

const nuxtApp = useNuxtApp()
const todoListStore = useTodoListStore()
nuxtApp.hook('app:mounted', async () => {
  todoListStore.setTodoList()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <AppModalContainerClient />
    <AppNotification />
  </ClientOnly>
</template>
