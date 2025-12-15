<!-- language: vue -->
<script setup lang="ts">
import {ref} from 'vue'
import type {TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import TravelRequestRow from './TravelRequestRow.vue'
import TravelRequestDetailsModal from './TravelRequestDetailsModal.vue'
import BaseSpinner from '@/shared/components/ui/BaseSpinner.vue'

interface Props {
  requests: TravelRequest[]
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  updateStatus: [id: number, status: 'approved' | 'canceled']
}>()

const updatingId = ref<number | null>(null)
const selectedRequest = ref<TravelRequest | null>(null)

async function handleUpdate(id: number, status: 'approved' | 'canceled') {
  updatingId.value = id
  emit('updateStatus', id, status)
  setTimeout(() => (updatingId.value = null), 1000)
}

function handleView(request: TravelRequest) {
  selectedRequest.value = request
}

function closeDetails() {
  selectedRequest.value = null
}
</script>

<template>
  <div class="travel-requests-table">
    <div v-if="loading" class="travel-requests-table__loading">
      <BaseSpinner/>
      <p>Carregando pedidos...</p>
    </div>

    <table v-else class="travel-requests-table__table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Destino</th>
        <th>Data Início</th>
        <th>Data Fim</th>
        <th>Status</th>
        <th>Solicitante</th>
        <th class="travel-requests-table__actions-header">Ações</th>
      </tr>
      </thead>
      <tbody>
      <TravelRequestRow
          v-for="request in requests"
          :key="request.id"
          :request="request"
          :updating="updatingId === request.id"
          @update-status="handleUpdate"
          @view="handleView"
      />
      <tr v-if="requests.length === 0">
        <td colspan="7" class="travel-requests-table__empty">
          Nenhum pedido encontrado
        </td>
      </tr>
      </tbody>
    </table>

    <TravelRequestDetailsModal
        v-if="selectedRequest"
        :request="selectedRequest"
        @close="closeDetails"
    />
  </div>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables';

.travel-requests-table {
  background: $white;
  border-radius: 8px;
  box-shadow: $shadow-sm;
  overflow: hidden;

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-xl * 2;
    gap: $spacing-md;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th {
      background: $primary;
      color: $white;
      padding: $spacing-sm;
      text-align: center;
      font-weight: 600;
      font-size: 0.8rem;
      white-space: nowrap;
      vertical-align: middle;
    }
  }

  &__actions-header {
    text-align: center;
  }

  &__empty {
    text-align: center;
    padding: $spacing-xl;
    color: $gray-dark;
  }
}
</style>