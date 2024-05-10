<template>
    <Navigation></Navigation>
    <RouterView v-slot="{ Component }">
        <Suspense>
            <div>
                <component :is="Component" />
            </div>
        </Suspense>
    </RouterView>
    <!-- <Suspense >
        <RouterView />
    </Suspense> -->
</template>
