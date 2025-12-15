<script setup lang="ts">
import {ref} from 'vue'
import {container} from '@/core/di/container'
import {TYPES} from '@/core/di/types'
import type {
  CreateTravelRequestUseCase
} from '@/modules/travel-requests/application/use-cases/CreateTravelRequestUseCase'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import BaseModal from '@/shared/components/ui/BaseModal.vue'
import {useAuthStore} from '@/shared/stores/authStore'
import {travelDestinations} from '@/modules/travel-requests/domain/constants/travelDestinations'

const emit = defineEmits<{
  close: []
  created: []
}>()

const authStore = useAuthStore()
const createUseCase = container.get<CreateTravelRequestUseCase>(TYPES.CreateTravelRequestUseCase)

const loading = ref(false)
const errorMessage = ref('')

const destinations = travelDestinations

const form = ref({
  destinationId: 0,
  startDate: '',
  endDate: ''
})

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    const payload = {
      userId: authStore.user?.id!,
      destinationId: form.value.destinationId,
      startDate: form.value.startDate,
      endDate: form.value.endDate
    }

    await createUseCase.execute(payload)
    emit('created')
  } catch (err: any) {
    let msg =
        err?.response?.data?.message ||
        err?.response?.data?.error?.message ||
        'Erro ao criar pedido'

    const errors = err?.response?.data?.errors
    if (errors) {
      const allMessages = Object.values(errors)
          .flat()
          .join('\n')
      msg = allMessages || msg
    }

    errorMessage.value = msg
    console.error('Erro ao criar pedido:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal @close="emit('close')">
    <h2 class="form-title">Novo Pedido de Viagem</h2>

    <div
        v-if="errorMessage"
        class="create-form__error"
        v-html="errorMessage.replace(/\n/g, '<br>')"
    />

    <form @submit.prevent="handleSubmit" class="create-form">
      <div class="create-form__group">
        <label>Destino</label>
        <select v-model.number="form.destinationId" required>
          <option value="0" disabled>Selecione um destino</option>
          <option
              v-for="destination in destinations"
              :key="destination.id"
              :value="destination.id"
          >
            {{ destination.name }}
          </option>
        </select>
      </div>

      <div class="create-form__group">
        <label>Data Início</label>
        <input v-model="form.startDate" type="date" required/>
      </div>

      <div class="create-form__group">
        <label>Data Fim</label>
        <input v-model="form.endDate" type="date" required/>
      </div>

      <div class="create-form__actions">
        <BaseButton variant="secondary" @click="emit('close')">
          Cancelar
        </BaseButton>
        <BaseButton type="submit" :loading="loading">
          Criar Pedido
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables';

.form-title {
  margin: 0 0 $spacing-lg;
  color: $dark;
}

.create-form {
  &__group {
    margin-bottom: $spacing-md;

    label {
      display: block;
      margin-bottom: $spacing-sm;
      font-weight: 600;
      color: $dark;
    }

    input,
    select {
      width: 100%;
      padding: $spacing-sm;
      border: 1px solid $light;
      border-radius: 4px;

      &:focus {
        outline: none;
        border-color: $primary;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
    margin-top: $spacing-lg;
  }

  &__error {
    margin-bottom: $spacing-md;
    padding: $spacing-sm $spacing-md;
    border-radius: 4px;
    background: lighten($danger, 40%);
    color: $danger;
    font-size: 0.875rem;
  }
}
</style>