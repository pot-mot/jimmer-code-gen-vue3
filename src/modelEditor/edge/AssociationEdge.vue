<script setup lang="ts">
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {BaseEdge, type EdgeProps, getSmoothStepPath} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import AutoResizeForeignObject from "@/modelEditor/svg/AutoResizeForeignObject.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const {zoom} = useModelEditor()

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"] | AbstractAssociationEdge["data"]>>()

const smoothStepPath = computed(() => {
    return getSmoothStepPath(props)
})

// 曲线中点控制 label 位置
const edgeRef = useTemplateRef<InstanceType<typeof BaseEdge>>("edgeRef")
const labelPoint = ref<{ x: number; y: number }>({x: 0, y: 0});

// 监听 svg 路径变化
let pathObserver: MutationObserver | undefined = undefined

// 计算贝塞尔曲线上的点
const calculateLabelPoint = (path: SVGPathElement) => {
    const totalLength = path.getTotalLength()
    if ("percentage" in props.data.labelPosition) {
        if (props.data.labelPosition.from === "source") {
            labelPoint.value = path.getPointAtLength(totalLength * props.data.labelPosition.percentage)
        } else {
            labelPoint.value = path.getPointAtLength(totalLength - totalLength * props.data.labelPosition.percentage)
        }
    } else if ("fixedLength" in props.data.labelPosition) {
        if (props.data.labelPosition.from === "source") {
            labelPoint.value = path.getPointAtLength(props.data.labelPosition.fixedLength)
        } else {
            labelPoint.value = path.getPointAtLength(totalLength - props.data.labelPosition.fixedLength)
        }
    }
}

watch(() => props.data.labelPosition, () => {
    const path = edgeRef.value?.$el?.nextElementSibling as SVGPathElement | undefined
    if (path === undefined) return
    calculateLabelPoint(path)
}, {deep: true})

// 同步 edge size position
const boundingClientRect = ref<DOMRect>()

// 计算 edge 外部尺寸
const calculateBoundingBox = (path: SVGPathElement) => {
    boundingClientRect.value = path.getBoundingClientRect()
}

onMounted(() => {
    const path = edgeRef.value?.$el?.nextElementSibling as SVGPathElement | undefined
    if (path === undefined) return
    calculateLabelPoint(path)
    calculateBoundingBox(path)
    pathObserver = new MutationObserver(() => {
        calculateLabelPoint(path)
        calculateBoundingBox(path)
    })
    pathObserver.observe(path, {
        attributes: true,
        attributeFilter: ['d']
    })
})

// 标签
const labelWidth = ref(0)
const labelHeight = ref(0)

const handleLabelResize = (size: { width: number, height: number }) => {
    labelWidth.value = size.width
    labelHeight.value = size.height
}

// 工具栏
const toolBarWidth = ref(0)
const toolBarHeight = ref(0)

const handleToolBarResize = (size: { width: number, height: number }) => {
    toolBarWidth.value = size.width
    toolBarHeight.value = size.height
}
</script>

<template>
    <g
        class="association-edge"
        :class="{selected}"
    >
        <BaseEdge
            ref="edgeRef"
            v-bind.prop="props"
            class="edge-line"
            :path="smoothStepPath[0]"
        />

        <AutoResizeForeignObject
            @resize="handleLabelResize"
            :transform="`translate(${labelPoint.x - labelWidth / 2} ${labelPoint.y - labelHeight / 2})`"
        >
            <slot name="label"/>
        </AutoResizeForeignObject>

        <AutoResizeForeignObject
            v-if="selected"
            @resize="handleToolBarResize"
            style="z-index: var(--edge-toolbar-z-index);"
            :transform="`translate(${labelPoint.x - toolBarWidth / (zoom * 2)} ${labelPoint.y - labelHeight / 2 - (toolBarHeight + 10) / zoom}) scale(${1 / zoom})`"
        >
            <slot name="toolbar"/>
        </AutoResizeForeignObject>
    </g>
</template>

<style scoped>
.association-edge {
    --edge-color: var(--border-color);
    --edge-width: 1px;
}

.association-edge:hover {
    --edge-width: 3px;
}

.association-edge.selected {
    --edge-color: var(--primary-color);
}

:deep(.edge-line) {
    stroke: var(--edge-color) !important;
    stroke-width: var(--edge-width) !important;
    transition: stroke 0.2s ease, stroke-width 0.2s ease;
}
</style>
