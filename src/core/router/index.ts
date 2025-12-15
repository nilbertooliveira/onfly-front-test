import {createRouter, createWebHistory} from 'vue-router'
import {authGuard} from '../guards/authGuard'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/modules/auth/presentation/pages/LoginPage.vue'),
            meta: {public: true}
        },
        {
            path: '/',
            component: () => import('@shared/components/layout/LayoutBase.vue'),
            meta: {requiresAuth: true},
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('@/modules/travel-requests/presentation/pages/DashboardPage.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: {name: 'dashboard'}
        }
    ]
})

router.beforeEach(authGuard)

export default router