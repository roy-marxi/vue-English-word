<template>
    <Container>
        <Detail :word-id="parseInt(route.params.id as string)"></Detail>
    </Container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute()
</script>