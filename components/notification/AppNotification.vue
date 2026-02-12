<script setup lang="ts">
import { useNotification } from '~/components/notification/useNotification'

const { notifications, closeNotification } = useNotification()
</script>

<template>
  <div class="notification-wrap">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="notification.type"
      @click="closeNotification(notification.id)"
    >
      <span class="notification-body">{{ notification.text }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.notification {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  word-wrap: break-word;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  pointer-events: auto;

  &-wrap {
    max-width: 350px;
    width: 100%;
    max-height: calc(100vh - 24px - 30px);
    height: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    z-index: 10;
    pointer-events: none;
  }

  &.success {
    color: #02B36E;
    background: #e3fbe3;
  }

  &.error {
    color: #e75d5d;
    background: #fbe3e3;
  }
}
</style>
