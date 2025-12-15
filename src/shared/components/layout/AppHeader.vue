<script setup lang="ts">
import {computed, onUnmounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/shared/stores/authStore'
import {useTravelRequestNotifications} from '@/shared/composables/useTravelRequestNotifications'
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import NotificationDropdown from '@/shared/components/ui/NotificationDropdown.vue'
import {container} from '@/core/di/container'
import {TYPES} from '@/core/di/types'
import type {LogoutUseCase} from '@/modules/auth/application/use-cases/LogoutUseCase'

const router = useRouter()
const authStore = useAuthStore()
const {notifications} = useTravelRequestNotifications()
const logoutUseCase = container.get<LogoutUseCase>(TYPES.LogoutUseCase)

const loggingOut = ref(false)
const user = computed(() => authStore.user)
const showNotifications = ref(false)
const notificationsWrapper = ref<HTMLElement | null>(null)

function closeNotifications() {
  showNotifications.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (notificationsWrapper.value && !notificationsWrapper.value.contains(event.target as Node)) {
    closeNotifications()
  }
}

watch(showNotifications, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

async function handleLogout() {
  loggingOut.value = true
  try {
    await logoutUseCase.execute()
    await router.push({name: 'login'})
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  } finally {
    loggingOut.value = false
  }
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <h1 class="app-header__logo">BigFlytec</h1>

      <div class="app-header__actions">
        <div ref="notificationsWrapper" class="app-header__notifications-wrapper">
          <button
              class="app-header__notifications"
              type="button"
              aria-label="Notificações"
              :aria-expanded="showNotifications"
              @click.stop="showNotifications = !showNotifications"
          >
            🔔
            <span v-if="notifications.length" class="app-header__notifications-badge">
              {{ notifications.length }}
            </span>
          </button>

          <NotificationDropdown
              v-if="showNotifications"
              :notifications="notifications"
          />
        </div>

        <span class="app-header__username">{{ user?.name || 'Usuário' }}</span>
        <BaseButton variant="danger" size="sm" :loading="loggingOut" @click="handleLogout">
          Sair
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/shared/styles/variables';

.app-header {
  background: $white;
  box-shadow: $shadow-md;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $header-height;
    padding: 0 $spacing-xl;
  }

  &__logo {
    margin: 0;
    color: $primary;
    font-size: 1.5rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__notifications-wrapper {
    position: relative;
  }

  &__notifications {
    position: relative;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: $spacing-xs;
    transition: opacity $transition-base;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: 2px solid $primary;
      outline-offset: 2px;
    }
  }

  &__notifications-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: $danger;
    color: $white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
  }

  &__username {
    color: $dark;
    font-weight: 500;
  }
}
</style>