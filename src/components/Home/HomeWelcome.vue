<template>
    <Container>
        <h1>欢迎来到丫丫背单词</h1>
        <Text :top="20" :buttom="60">使用丫丫背单词前请先登录。</Text>
        <div class="row-between">
            <ElButton
                class="btn"
                type="Primary"
                size="large"
                @click="router.push({
                    name: 'Signup',
                    query: { redirect: route.fullPath },
                })"
                round
                >注册</ElButton
            >
            <ElButton
                class="btn"
                size="large"
                @click="router.push({
                    name: 'Login',
                    query: { redirect: route.fullPath },
                })"
                round
                >登录</ElButton
            >
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useRoute , useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.btn {
    flex: 1;
}
</style>