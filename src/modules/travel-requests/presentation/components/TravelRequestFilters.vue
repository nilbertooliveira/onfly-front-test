<script setup lang="ts">
import {computed} from 'vue'
import type {
  TravelRequestFilters as TravelRequestFiltersDto
} from '@/modules/travel-requests/domain/entities/TravelRequestFilters'
import {travelDestinations} from '@/modules/travel-requests/domain/constants/travelDestinations'

const props = defineProps<{
  modelValue: TravelRequestFiltersDto
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TravelRequestFiltersDto): void
}>()

const destinations = travelDestinations

const localFilters = computed({
  get: () => props.modelValue || {},
  set: (value: TravelRequestFiltersDto) => emit('update:modelValue', value)
})

function emitUpdate(updates: Partial<TravelRequestFiltersDto>) {
  emit('update:modelValue', {...localFilters.value, ...updates})
}

function onStatusChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value || undefined
  emitUpdate({status: value as TravelRequestFiltersDto['status']})
}

function onDestinationChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value || undefined
  emitUpdate({destination_id: value})
}

function onStartDateChange(e: Event) {
  const value = (e.target as HTMLInputElement).value || undefined
  emitUpdate({start_date: value})
}

function onEndDateChange(e: Event) {
  const value = (e.target as HTMLInputElement).value || undefined
  emitUpdate({end_date: value})
}
</script>

<template>
  <div class="filters">
    <div class="filters__field">
      <label for="status">Status</label>
      <select
          id="status"
          :value="localFilters.status"
          @change="onStatusChange"
      >
        <option value="">Todos</option>
        <option value="requested">Requested</option>
        <option value="approved">Approved</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>

    <div class="filters__field">
      <label for="destination">Destino</label>
      <select
          id="destination"
          :value="localFilters.destination_id || ''"
          @change="onDestinationChange"
      >
        <option value="">Todos</option>
        <option
            v-for="destination in destinations"
            :key="destination.id"
            :value="destination.id"
        >
          {{ destination.name }}
        </option>
      </select>
    </div>

    <div class="filters__field">
      <label for="startDate">Data início</label>
      <input
          id="startDate"
          type="date"
          :value="localFilters.start_date || ''"
          @input="onStartDateChange"
      />
    </div>

    <div class="filters__field">
      <label for="endDate">Data fim</label>
      <input
          id="endDate"
          type="date"
          :value="localFilters.end_date || ''"
          @input="onEndDateChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  &__field {
    display: flex;
    flex-direction: column;
    min-width: 180px;

    label {
      font-size: 0.875rem;
      margin-bottom: $spacing-xs;
      font-weight: 500;
      color: $dark;
    }

    select,
    input {
      padding: $spacing-sm;
      border-radius: 4px;
      border: 1px solid $light;
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }
}
</style>