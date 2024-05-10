<template>
    <Container :width="400" class="container">
        <div class="box" @click="selectAvatar">
            <Elavatar class="avatar" :size="128" :src="avatarUrl" />
            <ElIcon class="camera" :size="60">
                <Camera />
            </ElIcon>
        </div>
        <Text
            v-if="userStore.registerTime"
            :size="14"
            color="var(--text-third-color)"
            >注册于：{{ timeTool?.formatTime(userStore.registerTime) }}</Text
        >
        <ElInput v-model="username" placeholder="请输入用户名~">
            <template #prepend>用户名</template>
        </ElInput>
        <div class="bio">
            <Text :size="12" color="var(--text-prompt-color)" :bottom="10"
                >个性签名</Text
            >
            <ElInput
                v-model="bio"
                type="textarea"
                :rows="4"
                placeholder="请输入个性签名~"
            ></ElInput>
        </div>
        <ElButton type="primary" @click="updateInfo">更新信息</ElButton>
        <div>
            <ElButton text bg @click="updatePasswordVisible = true"
                >修改密码</ElButton
            >
        </div>
        <ElDialog
            v-model="confirmPasswordVisible"
            title="修改用户名需要确认密码"
            width="380"
            center
        >
            <ElInput v-model="password" placeholder="请确认密码~"
                ><template #prepend>确认密码</template></ElInput
            >
            <template #footer>
                <span class="dialog-footer">
                    <ElButton type="primary" @click="updateInfo"
                        >确认密码</ElButton
                    >
                </span>
            </template>
        </ElDialog>
        <ElDialog
            v-model="updatePasswordVisible"
            title="修改密码"
            width="380"
            center
        >
            <ElInput
                class="buttom-20"
                v-model="password"
                placeholder="请输入旧密码~"
                size="large"
            >
                <template #prepend>旧密码</template>
            </ElInput>
            <ElInput
                v-model="newpassword"
                placeholder="请输入新密码~"
                size="large"
            >
                <template #prepend>新密码</template></ElInput
            >
            <template #footer>
                <span class="dialog-footer">
                    <ElButton type="primary" @click="updatePassword"
                        >更新密码</ElButton
                    >
                </span>
            </template>
        </ElDialog>
    </Container>
</template>

<script setup lang="ts">
import { Camera } from "@element-plus/icons-vue"
import { useTokenStore } from "@/stores/token"
import { useUserStore } from "@/stores/user"
import { updateSelfInfo } from "@/api/user"
import { type TimeTool } from "@/plugins/timeTool"

import { ElMessage } from "element-plus"
import { inject, ref } from "vue"

const timeTool = inject<TimeTool>("TimeTool")// as TimeTool

const tokenStore = useTokenStore()
const userStore = useUserStore()

const username = ref(userStore.username)
const bio = ref(userStore.bio)
const avatarUrl = ref(userStore.avatarUrl)

// 存储选择的头像
let avatar: File

const pickerOpts = {
    types: [
        {
            description: "Images",
            accept: {
                "image/*": [".png", ".jpeg", ".jpg"],
            },
        },
    ],
    excludeAcceptAllOptions: true,
    multiple: false,
}

async function selectAvatar() {
    // open file picker
    const [handle] = await showOpenFilePicker(pickerOpts)
    avatar = await handle.getFile()
    // 创建一个指向内存文件的 URL
    avatarUrl.value = URL.createObjectURL(avatar)
}

const confirmPasswordVisible = ref(false)
const password = ref("")
async function updateInfo() {
    const data: ParamUpdateSelfInfo = {}
    if (username.value != userStore.username) {
        // 如果修改用户名需要确认密码
        if (password.value === "") {
            confirmPasswordVisible.value = true
            return
        } else {
            data.username = username.value
            data.password = password.value
        }
    }

    if (bio.value != userStore.bio) {
        // 个性签名发生改变
        data.bio = bio.value
    }

    if (avatar) {
        data.avatar = avatar
    }

    const responseData = await updateSelfInfo(data)

    if (data.username) {
        // 更新了用户名需要更新 token
        ;({ token: tokenStore.token } = responseData as ApiUpdateSelfInfo)
    }

    ElMessage({
        message: "信息更新成功",
        type: "success",
    })

    //  更新 userStore 里的 信息
    userStore.updateSelfInfo()
    confirmPasswordVisible.value = false
}

const updatePasswordVisible = ref(false)
const newpassword = ref("")
async function updatePassword() {
    const data = {
        password: password.value,
        newpassword: newpassword.value,
    }

    // 更新了密码需要更新 token
    ;({ token: tokenStore.token } = (await updateSelfInfo(
        data
    )) as ApiUpdateSelfInfo)

    ElMessage({
        message: "密码更新成功",
        type: "success",
    })

    password.value = ""
    newpassword.value = ""
    updatePasswordVisible.value = false
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 20px;
}

.box {
    border-radius: 50%;

    position: relative;

    cursor: pointer;
}

.avatar {
    transition: filter 0.5s;
}

.Camera {
    position: absolute;
    /* 水平垂直居中 */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    opacity: 0;

    transition: opacity 0.5s;

    color: white;
}

.box:hover .avatar{
    filter: brightness(0.5);
}

.box:hover .camera {
    opacity: 1;
}

.bio {
    width: 100%;
}
</style>