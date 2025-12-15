<script setup lang="ts">
interface Notification {
  travelRequestId: number
  status: string
  destinationName: string
}

defineProps<{
  notifications: Notification[]
}>()
</script>

<template>
  <div class="notification-dropdown">
    <p v-if="!notifications.length" class="notification-dropdown__empty">
      Nenhuma notificação
    </p>
    <ul v-else class="notification-dropdown__list">
      <li v-for="(n, i) in notifications" :key="i">
        Pedido #{{ n.travelRequestId }} para <strong>{{ n.destinationName }}</strong>
        foi <strong>{{ n.status }}</strong>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.notification-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: $white;
  box-shadow: $shadow-md;
  border-radius: 4px;
  padding: $spacing-md;
  min-width: 260px;
  z-index: 3000;

  &__empty {
    margin: 0;
    color: $gray-dark;
    font-size: 0.875rem;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 0.875rem;
      color: $dark;
      padding: $spacing-xs 0;
      border-bottom: 1px solid $light;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>