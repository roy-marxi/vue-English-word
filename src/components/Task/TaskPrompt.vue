<template>
    <div>
        <TodayProgress :today="today" with-progress />
        <Text center :size="36" :bottom="20" bold>{{
            task.word 
        }}</Text>
        <div class="row-center">
            <VideoPlay
                class="icon"
                @click="playAudio(task.phonetic_audio)"
            ></VideoPlay>
            <Text :left="20" size="14" color="var(--text-third-color)"
                >/ {{ task.phonetic }} /</Text
            >
        </div>
        <div class="prompt">
            <Text :size="14" :bottom="10" color="var(--text-third-color)" center
                >根据提示，判断释义</Text
            >
            <div class="example">
                <Text class="label" color="var(--text-third-color)" :size="14"
                    >例句</Text
                >
                <Text bold>{{ task.example_en }}</Text>
                <VideoPlay
                    class="icon"
                    @click="playAudio(task.example_audio)"
                ></VideoPlay>
            </div>
        </div>
        <div class="bottom">
            <ElButton
                size="large"
                class="button"
                type="primary"
                round
                @click="$emit('remember')"
                >想起来了</ElButton
            >
            <ElButton
                size="large"
                class="button"
                type="warning"
                round
                @click="$emit('forget')"
                >没想起来</ElButton
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { VideoPlay } from "@element-plus/icons-vue"
import { playAudio } from "@/common/audio"

defineProps(["today", "task"])
defineEmits(["remember", "forget"])
</script>

<style scoped>
.prompt {
    margin-top: 20px;
    margin-bottom: 60px;
}

.icon {
    width: 20px;
    height: 20px;

    cursor: pointer;

    color: var(--primary-color);

    flex-shrink: 0;
}

.example {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    background-color: var(--background-second-color);

    padding: 20px;

    border-radius: 8px;

    width: 100%;
}

.label {
    flex-shrink: 0;
}

.bottom {
    display: flex;
}

.button {
    flex: 1;
}

/* 手机适配 */
@media not screen and (min-width: 768px) {
    .bottom {
        flex-direction: column;
    }
    .botton {
        margin: 10px 0;
    }
}
</style>