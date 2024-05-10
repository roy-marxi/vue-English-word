import * as echarts from 'echarts/core'
import {
    TitleComponent,
    type TitleComponentOption,
    TooltipComponent,
    type TooltipComponentOption,
    GridComponent,
    type GridComponentOption,
    LegendComponent,
    type LegendComponentOption
} from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsType } from 'echarts/core'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
])

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
>

export default function(
    element: HTMLElement,
    theme: string,
    data: ApiStatisticsSeven
) {
    // 基于准备好的dom，初始化echarts实例
    const echart: EChartsType = echarts.init(element, theme)

    const option: EChartsOption = {
        title: {
            text: '过去一周学习情况',
            left: '180'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [
                '总数',
                '简单',
                '记住',
                '忘记'
            ],
            right: '132'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.map((item) => item.date)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '总数',
                type: 'line',
                data: data.map(
                    (item) => 
                        item.simple_amount +
                        item.remember_amount +
                        item.forget_amount
                ),
            },
            {
                name: '简单',
                type: 'line',
                data: data.map((item) => item.simple_amount)
            },
            {
                name: '记住',
                type: 'line',
                data: data.map((item) => item.remember_amount)
            },
            {
                name: '忘记',
                type: 'line',
                data: data.map((item) => item.forget_amount)
            }
        ]
    }

    // 绘制图表
    echart.setOption(option)

    return echart
}