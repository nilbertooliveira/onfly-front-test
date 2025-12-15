import {onMounted, ref} from 'vue'
import EchoService from '@/core/services/EchoService'
import {useAuthStore} from '@/shared/stores/authStore'

interface Notification {
    travelRequestId: number
    status: string
    userName: string
    destinationName: string
}

export function useTravelRequestNotifications() {
    const authStore = useAuthStore()
    const notifications = ref<Notification[]>([])

    onMounted(() => {
        const userId = authStore.user?.id?.toString()

        if (!userId) {
            console.error('Usuário não autenticado')
            return
        }

        EchoService.initialize()
        EchoService.listenTravelRequestChanges(userId, (event) => {
            console.log('Notificação recebida:', event)
            notifications.value.push(event)
        })
    })

    return {
        notifications,
    }
}