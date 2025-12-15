<!-- language: vue -->
<script setup lang="ts">
import type {TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import BaseBadge from '@/shared/components/ui/BaseBadge.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

interface Props {
  request: TravelRequest
  updating: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  updateStatus: [id: number, status: 'approved' | 'canceled']
  view: [request: TravelRequest]
}>()

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR')
}

function getStatusVariant(status: string): 'warning' | 'success' | 'danger' {
  const map = {requested: 'warning', approved: 'success', canceled: 'danger'} as const
  return map[status as keyof typeof map] ?? 'warning'
}

function getStatusLabel(status: string) {
  const labels = {requested: 'Requested', approved: 'Approved', canceled: 'Canceled'} as const
  return labels[status as keyof typeof labels] ?? status
}
</script>

<template>
  <tr class="travel-request-row">
    <td>{{ props.request.id }}</td>
    <td>{{ props.request.destinationName }}</td>
    <td>{{ formatDate(props.request.startDate) }}</td>
    <td>{{ formatDate(props.request.endDate) }}</td>
    <td>
      <BaseBadge :variant="getStatusVariant(props.request.status)">
        {{ getStatusLabel(props.request.status) }}
      </BaseBadge>
    </td>
    <td>{{ props.request.userName }}</td>
    <td class="travel-request-row__actions">
      <div>
        <BaseButton
            variant="secondary"
            size="sm"
            @click="emit('view', props.request)"
        >
          Ver
        </BaseButton>

        <template v-if="props.request.status === 'requested'">
          <BaseButton
              variant="success"
              size="sm"
              :loading="props.updating"
              @click="emit('updateStatus', props.request.id, 'approved')"
          >
            Aprovar
          </BaseButton>
          <BaseButton
              variant="danger"
              size="sm"
              :loading="props.updating"
              @click="emit('updateStatus', props.request.id, 'canceled')"
          >
            Cancelar
          </BaseButton>
        </template>
      </div>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.travel-request-row {
  td {
    padding: $spacing-sm $spacing-md;
    border-bottom: 1px solid $light;
    font-size: 0.875rem;
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
  }

  &__actions {
    > div {
      display: inline-flex;
      align-items: center;
      gap: $spacing-sm;
    }
  }

  :deep(.base-btn) {
    font-size: 0.75rem;
  }
}
</style>