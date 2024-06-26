<template>
    <Container :width="680" class="container">
        <TaskWord 
            v-if="stage === Stage.word"
            :today="today"
            :task="task"
            @remember="remember"
            @prompt="prompt"
        />
        <TaskPrompt 
            v-else-if="stage === Stage.prompt"
            :today="today"
            :task="task"
            @remember="remember"
            @prompt="forget"
        />
        <template v-else-if="stage === Stage.detail">
            <!-- 套一个 div, 解决 Detail 因为加载延迟显示前的闪烁问题 -->
            <div class="bottom-20"><Detail :word-id="task.word_id" /></div>
            <ElButton
                size="large"
                class="button"
                type="primary"
                round
                @click="next"
                >学习下一个</ElButton
            >
        </template>
    </Container>
</template>

<script setup lang="ts">
import { playAudio } from "@/common/audio"
import { getTask, setTaskResult, TaskResult } from "@/api/task"
import { getStatisticsToday } from "@/api/statistics"
import { ref } from "vue"

enum Stage {
    word = 0, // 显示单词
    prompt = 1, // 提示
    detail = 2, // 单词详情
}

const stage = ref(Stage.word)

const [today, task] = await Promise.all([
    ref(await getStatisticsToday()),
    ref(await getTask()),
])

// 自动播放
// 用户不点击，无法自动播放
playAudio(task.value.phonetic_audio).catch(() => {})

async function remember() {
    await setTaskResult(task.value.task_id, TaskResult.remember)

    stage.value = Stage.detail
}

function prompt() {
    playAudio(task.value.example_audio)
    stage.value = Stage.prompt
}

async function forget() {
    await setTaskResult(task.value.task_id, TaskResult.forget)
    stage.value = Stage.detail
}

async function next() {
    // 下一个单词
    ;[today.value, task.value] = await Promise.all([
        getStatisticsToday(),
        getTask(),
    ])
    playAudio(task.value.phonetic_audio)

    stage.value = Stage.word
}
</script>

<style scoped>
.container {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* 减去导航栏高度，使其加上导航栏刚好一屏的高度 */
    height: calc(100vh - 60px);

    max-height: 800px;
}
</style>