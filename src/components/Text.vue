<template>
    <span v-if="inline" class="text"><slot></slot></span>
    <div v-else class="text"><slot></slot></div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
    inline: {
        type: Boolean,
        default: false,
    },
    bold: {
        // 粗体
        type: Boolean,
        default: false,
    },
    light: {
        // 细体
        type: Boolean,
        default: false,
    },
    textAlign: {
        type: String,
    },
    center: {
        type: Boolean,
        default: false,
    },
    color: String,
    size: [Number, String],
    // 设置 margin
    left: [Number, String],
    top: [Number, String],
    right: [Number, String],
    bottom: [Number, String],
    vertical: [Number, String], // 垂直
    horizontal: [Number, String], // 水平
})

function formatPx(value: number | String | undefined): string {
    if (value) {
        return typeof value === "string" ? value : `${value}px`
    }
    return "unset"
}

const size = computed(() => formatPx(props.size))
    // return typeof props.size === "string" ? props.size : `${props.size}px`

const margin = computed(() => {
    let top, right, bottom, left

    top = bottom = props.vertical ? formatPx(props.vertical) : "0"
    left = right = props.horizontal ? formatPx(props.horizontal) : "0"

    if (props.top) top = formatPx(props.top)
    if (props.right) right = formatPx(props.right)
    if (props.bottom) bottom = formatPx(props.bottom)
    if (props.left) left = formatPx(props.left)

    return `${top} ${left} ${right} ${bottom}`
})

const weight = computed(() => {
    // if (props.bold && props.light) {
    //     console.error("不能同时设置 bold 和 light")
    // }

    console.assert(!(props.bold && props.light), "不能同时设置 bold 和 light")

    if (props.bold) return 700
    if (props.light) return 100

    return "unset"
})

const textAlign = computed(() => {
    return props.center ? "center" : props.textAlign || "unset"
})
</script>

<style scoped>
.text {
    color: v-bind("$props.color");

    font-size: v-bind(size);
    font-weight: v-bind(weight);

    text-align: v-bind(textAlign);

    margin: v-bind(margin);
}
</style>