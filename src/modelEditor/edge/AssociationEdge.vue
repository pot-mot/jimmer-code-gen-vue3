<script setup lang="ts">
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {BaseEdge, type EdgeProps, getSmoothStepPath} from "@vue-flow/core";
import type {ConcreteAssociationEdge} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import type {AbstractAssociationEdge} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import AutoResizeForeignObject from "@/modelEditor/svg/AutoResizeForeignObject.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";

const {zoom, isGraphSelectionPlural, modelSelection} = useModelEditor()

const props = defineProps<EdgeProps<ConcreteAssociationEdge["data"] | AbstractAssociationEdge["data"]>>()

const smoothStepPath = computed(() => {
    return getSmoothStepPath(props)
})

const strokeDasharray = computed(() => {
    if (props.data.association.foreignKeyType === "FAKE") {
        return "5"
    } else {
        return "0"
    }
})

// 曲线中点控制 label 位置
const edgeRef = useTemplateRef<InstanceType<typeof BaseEdge>>("edgeRef")
const labelPoint = ref<{ x: number; y: number }>({x: 0, y: 0});

const getPath = (): SVGPathElement | undefined => {
    return edgeRef.value?.$el?.nextElementSibling as SVGPathElement | undefined
}

// 监听 svg 路径变化
let pathObserver: MutationObserver | undefined = undefined

// 计算贝塞尔曲线上的点
const calculateLabelPoint = (path: SVGPathElement) => {
    const totalLength = path.getTotalLength()
    if ("percentage" in props.data.labelPosition) {
        if (props.data.labelPosition.from === "source") {
            labelPoint.value = path.getPointAtLength(totalLength * props.data.labelPosition.percentage / 100)
        } else {
            labelPoint.value = path.getPointAtLength(totalLength - totalLength * props.data.labelPosition.percentage / 100)
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
    const path = getPath()
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

// 切换 ForeignKeyType
const toggleForeignKeyType = () => {
    if (props.data.association.foreignKeyType === "REAL") {
        props.data.association.foreignKeyType = "FAKE"
    } else {
        props.data.association.foreignKeyType = "REAL"
    }
}

const formatNumber = (value: number, decimals: number = 2): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// 切换 labelPosition 类型
const percentageToFixedLength = () => {
    const path = getPath()
    if ('percentage' in props.data.labelPosition && path) {
        props.data.labelPosition = {
            from: props.data.labelPosition.from,
            fixedLength: formatNumber(props.data.labelPosition.percentage / 100 * path.getTotalLength())
        }
    }
}

const fixedLengthToPercentage = () => {
    const path = getPath()
    if ('fixedLength' in props.data.labelPosition && path) {
        props.data.labelPosition = {
            from: props.data.labelPosition.from,
            percentage: formatNumber(props.data.labelPosition.fixedLength * 100 / path.getTotalLength())
        }
    }
}

// 切换 labelPosition 源
const toggleLabelPositionFrom = () => {
    if (props.data.labelPosition.from === "source") {
        if ('fixedLength' in props.data.labelPosition) {
            const path = getPath()
            if (path) {
                props.data.labelPosition = {
                    from: "target",
                    fixedLength: path.getTotalLength() - props.data.labelPosition.fixedLength
                }
            }
        } else {
            props.data.labelPosition = {
                from: "target",
                percentage: 100 - props.data.labelPosition.percentage
            }
        }
    } else {
        if ('fixedLength' in props.data.labelPosition) {
            const path = getPath()
            if (path) {
                props.data.labelPosition = {
                    from: "source",
                    fixedLength: path.getTotalLength() - props.data.labelPosition.fixedLength
                }
            }
        } else {
            props.data.labelPosition = {
                from: "source",
                percentage: 100 - props.data.labelPosition.percentage
            }
        }
    }
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
            v-if="selected && !isGraphSelectionPlural"
            @resize="handleToolBarResize"
            style="z-index: var(--edge-toolbar-z-index);"
            :transform="`translate(${labelPoint.x - toolBarWidth / (zoom * 2)} ${labelPoint.y - labelHeight / 2 - (toolBarHeight + 10) / zoom}) scale(${1 / zoom})`"
        >
            <div style="display: flex; justify-content: center;">
                <button @click="toggleForeignKeyType">
                    {{ data.association.foreignKeyType === 'REAL' ? "[REAL]" : "[FAKE]" }}
                </button>
            </div>

            <div style="display: flex; justify-content: center; height: 1.5rem;">
                <button
                    @click="toggleLabelPositionFrom"
                    style="width: 4rem; text-align: center; margin-right: 0.25rem; border-radius: 0.25rem;"
                >
                    {{ data.labelPosition.from === "source" ? "[source]" : "[target]" }}
                </button>

                <template v-if="'percentage' in data.labelPosition">
                    <input
                        v-model.lazy.number="data.labelPosition.percentage"
                        @change="data.labelPosition.percentage = Math.min(100, Math.max(0, data.labelPosition.percentage)); modelSelection.selectAssociation(data.association.id);"
                        style="text-align: center; width: 3rem;"
                    >
                    <button @click="percentageToFixedLength"
                            style="width: 1rem; text-align: center; border-radius: 0 0.25rem 0.25rem 0;">%
                    </button>
                </template>
                <template v-else>
                    <input
                        v-model.lazy.number="data.labelPosition.fixedLength"
                        @change="data.labelPosition.fixedLength = Math.max(0, data.labelPosition.fixedLength); modelSelection.selectAssociation(data.association.id);"
                        style="text-align: center; width: 3rem;"
                    >
                    <button @click="fixedLengthToPercentage"
                            style="width: 1rem; text-align: center; border-radius: 0 0.25rem 0.25rem 0;">px
                    </button>
                </template>
            </div>

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
    stroke-dasharray: v-bind(strokeDasharray);
    transition: stroke 0.2s ease, stroke-width 0.2s ease;
}
</style>
