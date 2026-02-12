<script setup lang="ts">
import LoaderIcon from '~/components/shared/icons/loader.vue'
</script>

<template>
  <div class="loader flex-item">
    <LoaderIcon class="loader-icon" />
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 100%;
  align-items: center;

  &-icon {
    width: 100px;
    animation: loader-animate 0.6s ease-in-out infinite;
  }
}

@keyframes loader-animate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
