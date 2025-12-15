import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import {useAuthStore} from '@/shared/stores/authStore'

interface Notification {
    travelRequestId: number
    status: string
    userName: string
    destinationName: string
}

class EchoService {
    private echo: Echo<'pusher'> | null = null
    private isInitialized = false

    initialize(): void {
        if (this.isInitialized) return

        const authStore = useAuthStore()
        const token = authStore.token

        if (!token) {
            console.error('Token não disponível para inicializar Echo')
            return
        }

        ;(window as any).Pusher = Pusher

        this.echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            wsHost: import.meta.env.VITE_PUSHER_HOST,
            wsPort: Number(import.meta.env.VITE_PUSHER_PORT),
            wssPort: Number(import.meta.env.VITE_PUSHER_PORT),
            forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
            enabledTransports: ['ws', 'wss'],
            authEndpoint: `${import.meta.env.VITE_API_URL}broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        })

        this.echo.connector.pusher.connection.bind('error', (error: Error) => {
            console.error('Erro de conexão Pusher:', error)
        })

        this.isInitialized = true
    }

    listenTravelRequestChanges(
        userId: string,
        callback: (data: Notification) => void,
    ): void {
        if (!this.echo) {
            this.initialize()
            if (!this.echo) {
                console.error('Falha ao inicializar Echo')
                return
            }
        }

        this.echo
            .private(`private-user.${userId}`)
            .listen('TravelRequestStatusChanged', (event: any) => {
                const payload: Notification = {
                    travelRequestId: event.travelRequestId,
                    status: event.status,
                    userName: event.userName,
                    destinationName: event.destinationName,
                }
                callback(payload)
            })
            .error((error: any) => {
                console.error('Erro ao escutar canal:', error)
            })
    }

    disconnect(): void {
        if (this.echo) {
            this.echo.disconnect()
            this.isInitialized = false
        }
    }
}

export default new EchoService()