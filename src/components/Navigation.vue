<template>
    <div class="container">
        <header class="navigation row-between">
            <Hamburger class="only-phone row-start">
                <img class="logo" src="/public/扇贝logo.jpg">
                <RouterLink class="btn" :to="{ name: 'Home' }">{{
                    $t("背单词")
                }}</RouterLink>
                <RouterLink class="btn" :to="{ name: 'Words' }">{{
                    $t("词表")
                }}</RouterLink>
                <RouterLink class="btn" :to="{ name: 'Statistics' }"
                    >{{ $t("数据统计") }}</RouterLink
                >
                <ElSwitch
                    class="theme-switch"
                    v-model="themeStore.theme" 
                    :active-value="Theme.dark"
                    :inactive-value="Theme.light"
                    :active-icon="Moon" 
                    :inactive-icon="Sunny"
                />
                <ElDropdown size="large">
                    <TransIcon 
                        class="translate"
                        @click="langStore.locale = 'en'"
                    />
                    <template #dropdown>
                        <ElDropdownItem
                            v-for="locale of langStore.availableLocales"
                            @click="langStore.locale = locale"
                            class="lang"
                        >
                            {{ $t(locale) }}
                        </ElDropdownItem>
                    </template>
                </ElDropdown>
            </Hamburger>
            <div class="only-pc row-start">
                <img class="logo" src="/public/扇贝logo.jpg">
                <RouterLink class="btn" :to="{ name: 'Home' }">{{
                    $t("背单词")
                }}</RouterLink>
                <RouterLink class="btn" :to="{ name: 'Words' }">{{
                    $t("词表")
                }}</RouterLink>
                <RouterLink class="btn" :to="{ name: 'Statistics' }"
                    >{{ $t("数据统计") }}</RouterLink
                >
                <ElSwitch
                    class="theme-switch"
                    v-model="themeStore.theme" 
                    :active-value="Theme.dark"
                    :inactive-value="Theme.light" 
                    :active-icon="Moon" 
                    :inactive-icon="Sunny" 
                />
                <ElDropdown size="large">
                    <TransIcon 
                        class="translate"
                        @click="langStore.locale = 'en'"
                    />
                    <template #dropdown>
                        <ElDropdownItem
                            v-for="locale of langStore.availableLocales"
                            @click="langStore.locale = locale"
                            class="lang"
                        >
                            {{ $t(locale) }}
                        </ElDropdownItem>
                    </template>
                </ElDropdown>
            </div>
            <div>
                <template v-if="tokenStore.isLogined">
                    <ElDropdown>
                        <ElAvatar :src="userStore.avatarUrl" />
                        <template #dropdown>
                            <ElDropdownMenu>
                                <Text :vertical="5" bold center>{{ 
                                    userStore.username 
                                }}</Text>
                                <ElDropdownItem
                                    @click="
                                        router.push({ name: 'SettingInfo' })
                                    "
                                    >个人设置</ElDropdownItem
                                >
                                <ElDropdownItem
                                    @click="
                                        router.push({ name: 'SettingLearn' })
                                    "
                                    >学习设置</ElDropdownItem
                                >
                                <ElDropdownItem 
                                    @click="tokenStore.logout"
                                    divided
                                    >退出登录</ElDropdownItem
                                >
                            </ElDropdownMenu>
                        </template>
                    </ElDropdown>
                </template>
                <template v-else>
                    <RouterLink 
                        class="btn" 
                        :to="{
                            name: 'Login',
                            query: { redirect: route.fullPath },
                        }"
                        >登录</RouterLink
                    >
                    <RouterLink 
                        class="btn" 
                        :to="{
                            name: 'Signup',
                            query:{ redirect: route.fullPath },
                        }"
                        >注册</RouterLink
                    >
                </template>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "@/stores/token"
import { useUserStore } from "@/stores/user"
import { useThemeStore, Theme } from "@/stores/theme"

import { useLangStore } from "@/stores/lang"
import TransIcon from "@/assets/trans.svg?component"

import { Sunny, Moon } from "@element-plus/icons-vue"
import { useRoute, useRouter } from "vue-router"

const tokenStore = useTokenStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const langStore = useLangStore()

const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.container {
    position: sticky;
    top: 0;

    background-color: var(--background-color);

    transition: background-color 1s, box-shadow 1s;

    z-index: 999;
    box-shadow: 0 0 4px var(--background-third-color);
}

.navigation {
    max-width: 1000px;
    margin: 0 auto;

    height: 60px;
    padding: 0 20px;
}

a {
    color: inherit;
    text-decoration: inherit;
}

.logo {
    width: 36px;
    margin: 0 20px;
}

.btn {
    font-weight: bold;

    color: var(--text-third-color);
    padding: 10px 20px;
}

.btn:hover {
    color: var(--text-color);
    background-color: var(--background-seconed-color);
    border-radius: 8px;
}

.theme-switch {
    padding: 10px 20px;
    --el-switch-on-color: var(--background-seconed-color)
}

.translate {
    margin: 10px 20px;
    width: 25px;
    fill: var(--text-third-color);
}
</style>