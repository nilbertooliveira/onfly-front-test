<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {container} from '@/core/di/container'
import {TYPES} from '@/core/di/types'
import type {ListTravelRequestsUseCase} from '@/modules/travel-requests/application/use-cases/ListTravelRequestsUseCase'
import type {
  UpdateTravelRequestStatusUseCase
} from '@/modules/travel-requests/application/use-cases/UpdateTravelRequestStatusUseCase'

import type {TravelRequest} from '@/modules/travel-requests/domain/entities/TravelRequest'
import type {
  TravelRequestFilters as TravelRequestFiltersDto
} from '@/modules/travel-requests/domain/entities/TravelRequestFilters'
import TravelRequestsTable from '../components/TravelRequestsTable.vue'
import TravelRequestFilters from '../components/TravelRequestFilters.vue'
import CreateTravelRequestForm from '../components/CreateTravelRequestForm.vue'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

const listUseCase = container.get<ListTravelRequestsUseCase>(TYPES.ListTravelRequestsUseCase)
const updateStatusUseCase = container.get<UpdateTravelRequestStatusUseCase>(
    TYPES.UpdateTravelRequestStatusUseCase
)

const requests = ref<TravelRequest[]>([])
const loading = ref(false)
const showCreateModal = ref(false)
const error = ref('')
let errorTimeout: number | undefined

const filters = ref<TravelRequestFiltersDto>({})

function setError(message: string) {
  error.value = message
  if (errorTimeout) {
    clearTimeout(errorTimeout)
  }
  errorTimeout = window.setTimeout(() => {
    error.value = ''
  }, 5000)
}

async function loadRequests() {
  loading.value = true
  error.value = ''
  try {
    requests.value = await listUseCase.execute(filters.value)
  } catch (err: any) {
    const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Erro ao carregar pedidos'
    setError(msg)
  } finally {
    loading.value = false
  }
}

async function handleUpdateStatus(id: number, status: 'approved' | 'canceled') {
  error.value = ''
  try {
    await updateStatusUseCase.execute(id, status)
    await loadRequests()
  } catch (err: any) {
    const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        'Erro ao atualizar status'
    setError(msg)
  }
}

function handleRequestCreated() {
  showCreateModal.value = false
  loadRequests()
}

async function handleFiltersChange(newFilters: TravelRequestFiltersDto) {
  filters.value = newFilters
  await loadRequests()
}

onMounted(loadRequests)
</script>

<template>
  <div class="dashboard-container">
    <div class="dashboard-card">
      <header class="dashboard-card__header">
        <h1>Pedidos de Viagem</h1>
        <BaseButton @click="showCreateModal = true">+ Novo Pedido</BaseButton>
      </header>

      <div v-if="error" class="dashboard-card__error">{{ error }}</div>

      <TravelRequestFilters
          :model-value="filters"
          @update:model-value="handleFiltersChange"
      />

      <TravelRequestsTable
          :requests="requests"
          :loading="loading"
          @update-status="handleUpdateStatus"
      />
    </div>

    <CreateTravelRequestForm
        v-if="showCreateModal"
        @close="showCreateModal = false"
        @created="handleRequestCreated"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  min-height: auto;
  background: transparent;
}

.dashboard-card {
  width: 100%;
  max-width: 1400px;
  background: $white;
  padding: $spacing-lg;
  border-radius: 8px;
  box-shadow: $shadow-md;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;

    h1 {
      margin: 0;
      color: $dark;
      font-size: 1.5rem;
    }
  }

  &__error {
    padding: $spacing-sm;
    background: lighten($danger, 40%);
    color: $danger;
    border-radius: 4px;
    margin-bottom: $spacing-sm;
  }
}
</style>