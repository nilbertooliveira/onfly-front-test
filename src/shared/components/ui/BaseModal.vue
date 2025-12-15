<script setup lang="ts">
defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="base-modal" @click.self="$emit('close')">
    <div class="base-modal__content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.base-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn $transition-base;

  &__content {
    background: $white;
    padding: $spacing-xl;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: $shadow-lg;
    animation: slideUp $transition-base;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>