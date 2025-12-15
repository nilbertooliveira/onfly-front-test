<template>
  <div class="base-spinner"></div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.base-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>