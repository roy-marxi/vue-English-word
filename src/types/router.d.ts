// typings.d.ts or router.ts
import "vue-router"

declare module "vue-router" {
    interface RouteMeta {
        title?: string
        requiresAuth?: boolean
        requiresNoAuth?: boolean
    }
}