<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {container} from '@/core/di/container'
import {TYPES} from '@/core/di/types'
import type {LoginUseCase} from '@/modules/auth/application/use-cases/LoginUseCase'

const router = useRouter()
const loginUseCase = container.get<LoginUseCase>(TYPES.LoginUseCase)

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async (): Promise<void> => {
  error.value = ''
  isLoading.value = true

  try {
    await loginUseCase.execute(email.value, password.value)
    await router.push({name: 'dashboard'})
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Erro ao fazer login'
    console.error('Erro no login:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1>Login</h1>

      <div v-if="error" class="error-message">{{ error }}</div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" required/>
      </div>

      <div class="form-group">
        <input v-model="password" type="password" placeholder="Senha" required/>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Carregando...' : 'Entrar' }}
      </button>
    </form>
  </div>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables';

.login-page {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $light;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: $spacing-xl;
  background: $white;
  border-radius: 8px;
  box-shadow: $shadow-md;

  h1 {
    margin-bottom: $spacing-lg;
    color: $dark;
  }
}

.error-message {
  padding: $spacing-sm $spacing-md;
  margin-bottom: $spacing-md;
  background: lighten($danger, 40%);
  color: $danger;
  border-radius: 4px;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: $spacing-md;

  input {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid $light;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }
}

button {
  width: 100%;
  padding: $spacing-sm;
  background: $primary;
  color: $white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity $transition-base;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
