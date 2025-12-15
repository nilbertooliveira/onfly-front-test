import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import {useAuthStore} from '@/shared/stores/authStore'

export async function authGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isPublicRoute = to.meta.public === true
    const isLoginPage = to.name === 'login'

    if (isPublicRoute) {
        return next()
    }

    if (authStore.isAuthenticated && isLoginPage) {
        return next({name: 'dashboard'})
    }

    if (requiresAuth && !authStore.isAuthenticated) {
        return next({name: 'login'})
    }

    next()
}