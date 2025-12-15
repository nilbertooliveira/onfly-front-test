<script setup lang="ts">
import BaseSpinner from '@/shared/components/ui/BaseSpinner.vue'

interface Props {
  variant?: 'primary' | 'success' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
      :class="['base-btn', `base-btn--${variant}`, `base-btn--${size}`]"
      :disabled="disabled || loading"
      @click="$emit('click', $event)"
  >
    <BaseSpinner v-if="loading" class="base-btn__spinner"/>
    <slot v-else/>
  </button>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-base;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background: $primary;
    color: $white;

    &:hover:not(:disabled) {
      background: darken($primary, 10%);
    }
  }

  &--success {
    background: $success;
    color: $white;

    &:hover:not(:disabled) {
      background: darken($success, 10%);
    }
  }

  &--danger {
    background: $danger;
    color: $white;

    &:hover:not(:disabled) {
      background: darken($danger, 10%);
    }
  }

  &--secondary {
    background: $gray-light;
    color: $white;

    &:hover:not(:disabled) {
      background: darken($gray-light, 10%);
    }
  }

  &--sm {
    padding: $spacing-xs $spacing-sm;
    font-size: 0.875rem;
  }

  &--lg {
    padding: $spacing-md $spacing-lg;
    font-size: 1.125rem;
  }

  &__spinner {
    width: 16px;
    height: 16px;
  }
}
</style>