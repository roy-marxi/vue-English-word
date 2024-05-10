import { ElMessage } from "element-plus"

import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

import Home from '@/pages/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { title: "首页" },
        },
        {
            path: '/words',
            name: 'Words',
            component: () => import('../pages/Words.vue'),
            meta: { title: "词表" },
        },
        {
            path: '/words/:id',
            name: 'WordDetail',
            component: () => import('../pages/WordDetail.vue'),
            meta: { title: "单词详情" },
        },
        {
            path: '/statistics',
            name: 'Statistics',
            component: () => import('../pages/Statistics.vue'),
            meta: { title: "学习数据", requiresAuth: true },
        },
        {
            path: '/task',
            name: 'Task',
            component: () => import('../pages/Task.vue'),
            meta: { title: "学习" },
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../pages/Login.vue'),
            meta: { title: "登录", requiresNoAuth: true },
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () => import('../pages/Signup.vue'),
            meta: { title: "注册", requiresNoAuth: true },
        },
        {
            path: '/setting/info',
            name: 'SettingInfo',
            component: () => import('../pages/Setting/Info.vue'),
            // 只有经过身份验证的用户才能查看
            meta: { title: "个人信息设置", requiresAuth: true },
        },
        {
            path: '/setting/learn',
            name: 'SettingLearn',
            component: () => import('../pages/Setting/Learn.vue'),
            // 只有经过身份验证的用户才能查看
            meta: { title: "学习设置", requiresAuth: true },
        },
        { 
            path: "/:pathMatch(.*)*", 
            name: "NotFound", 
            component: () => import('../pages/NotFound.vue'), 
        }
    ]
})

router.beforeEach((to, from) => {
    const tokenStore = useTokenStore()

    if (tokenStore.isLogined) {
        if (to.meta.requiresNoAuth) {
            // 这个页面登录后就不允许访问
            router.push({
                name: "Home",
            })
        }
    } else {
        // 如果没登陆
        if (to.meta.requiresAuth) {
            router.push({
                name: "Login",
                // 保存我们所在的位置。以便以后再来
                query: { redirect: to.fullPath },
            })
        }
    }

    if (to.meta.title) {
        document.title = `${to.meta.title} - 背单词`
    }
})

export default router
