<script setup lang="ts">
interface Props {
  variant: 'warning' | 'success' | 'danger'
}

defineProps<Props>()
</script>

<template>
    <span :class="['base-badge', `base-badge--${variant}`]">
      <slot/>
    </span>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.base-badge {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;

  &--warning {
    background: $warning;
    color: $white;
  }

  &--success {
    background: $success;
    color: $white;
  }

  &--danger {
    background: $danger;
    color: $white;
  }
}
</style>