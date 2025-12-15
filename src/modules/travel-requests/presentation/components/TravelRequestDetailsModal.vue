<script setup lang="ts">
import type {TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import BaseModal from '@/shared/components/ui/BaseModal.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

defineProps<{
  request: TravelRequest
}>()

const emit = defineEmits<{
  close: []
}>()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<template>
  <BaseModal @close="emit('close')">
    <h2 class="details-title">Detalhes do Pedido</h2>

    <dl class="details-list">
      <div class="details-list__row">
        <dt>ID</dt>
        <dd>{{ request.id }}</dd>
      </div>
      <div class="details-list__row">
        <dt>Usuário</dt>
        <dd>{{ request.userName }} (ID: {{ request.userId }})</dd>
      </div>
      <div class="details-list__row">
        <dt>Destino</dt>
        <dd>{{ request.destinationName }} (ID: {{ request.destinationId }})</dd>
      </div>
      <div class="details-list__row">
        <dt>Data Início</dt>
        <dd>{{ formatDate(request.startDate) }}</dd>
      </div>
      <div class="details-list__row">
        <dt>Data Fim</dt>
        <dd>{{ formatDate(request.endDate) }}</dd>
      </div>
      <div class="details-list__row">
        <dt>Status</dt>
        <dd>{{ request.status }}</dd>
      </div>
      <div class="details-list__row">
        <dt>Role</dt>
        <dd>{{ request.role || '-' }}</dd>
      </div>
    </dl>

    <div class="details-actions">
      <BaseButton variant="secondary" size="sm" @click="emit('close')">
        Fechar
      </BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.details-title {
  margin: 0 0 $spacing-md;
  font-size: 1.25rem;
  color: $dark;
}

.details-list {
  margin: 0;
  padding: 0;

  &__row {
    display: grid;
    grid-template-columns: 140px 1fr;
    column-gap: $spacing-md;
    padding: $spacing-xs 0;
    border-bottom: 1px solid $light;

    &:last-child {
      border-bottom: none;
    }

    dt {
      font-weight: 600;
      color: $dark;
    }

    dd {
      margin: 0;
      color: $gray-dark;
    }
  }
}

.details-actions {
  margin-top: $spacing-lg;
  display: flex;
  justify-content: flex-end;
}
</style>