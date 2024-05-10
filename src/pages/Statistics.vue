<template>
    <Container>
        <div ref="todayElement" class="chart"></div>
        <div ref="sevenElement" class="chart"></div>
    </Container>
</template>

<script setup lang="ts">
// import * as echarts from 'echarts' // 全部引入
import { onMounted, ref, watch, type Ref } from 'vue'
import * as echarts from 'echarts/core'

import { getStatisticsToday, getStatisticsSeven } from "@/api/statistics"
import { Theme, useThemeStore } from "@/stores/theme"
import type { EChartsType } from 'echarts/core'

import initTodayEchart from "@/echarts/today"
import initSevenEchart from "@/echarts/seven"

import darkTheme from "@/assets/echarts/darkTheme"

const todayElement: Ref<HTMLElement | null> = ref(null)
const sevenElement: Ref<HTMLElement | null> = ref(null)

// 先等待今天的数据返回，再去拿过去一周的数据
const [todayData, sevenData] = await Promise.all([
    getStatisticsToday(),
    getStatisticsSeven()
])

let todayEchart: EChartsType
let sevenEchart: EChartsType

const themeStore = useThemeStore()

watch(
    () => themeStore.theme,
    (vaue) => {
        // 删除原来的表格
        disposeEcharts()
        initEcharts()
    }
)

onMounted(() => {
    echarts.registerTheme('dark', darkTheme)
    initEcharts()
})

function initEcharts() {
    todayEchart = initTodayEchart(
        todayElement.value as HTMLElement, 
        themeStore.theme === Theme.light ? "light" : "dark", 
        todayData
    )

    sevenEchart = initSevenEchart(
        sevenElement.value as HTMLElement, 
        themeStore.theme === Theme.light ? "light" : "dark", 
        sevenData
    )
}

function disposeEcharts() {
    todayEchart?.dispose()
    sevenEchart?.dispose()
}
</script>

<style scoped>
.chart {
    width: 100%;
    aspect-ratio: 16 / 9;

    margin: 60px 0;
}
</style>