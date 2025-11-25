<script setup lang="ts">
const props = defineProps<{
    getPath: () => SVGPathElement | undefined
}>()

const labelPosition = defineModel<LabelPosition>({
    required: true
})

const formatNumber = (value: number, decimals: number = 2): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// 切换 labelPosition 类型
const percentageToFixedLength = () => {
    const path = props.getPath()
    if ('percentage' in labelPosition.value && path) {
        labelPosition.value = {
            from: labelPosition.value.from,
            fixedLength: formatNumber(labelPosition.value.percentage / 100 * path.getTotalLength())
        }
    }
}

const fixedLengthToPercentage = () => {
    const path = props.getPath()
    if ('fixedLength' in labelPosition.value && path) {
        labelPosition.value = {
            from: labelPosition.value.from,
            percentage: formatNumber(labelPosition.value.fixedLength * 100 / path.getTotalLength())
        }
    }
}

// 切换 labelPosition 源
const toggleLabelPositionFrom = () => {
    if (labelPosition.value.from === "source") {
        if ('fixedLength' in labelPosition.value) {
            const path = props.getPath()
            if (path) {
                labelPosition.value = {
                    from: "target",
                    fixedLength: path.getTotalLength() - labelPosition.value.fixedLength
                }
            }
        } else {
            labelPosition.value = {
                from: "target",
                percentage: labelPosition.value.percentage
            }
        }
    } else {
        if ('fixedLength' in labelPosition.value) {
            const path = props.getPath()
            if (path) {
                labelPosition.value = {
                    from: "source",
                    fixedLength: path.getTotalLength() - labelPosition.value.fixedLength
                }
            }
        } else {
            labelPosition.value = {
                from: "source",
                percentage: labelPosition.value.percentage
            }
        }
    }
}

// 限制数值范围
const handleNumberChange = () => {
    if ('percentage' in labelPosition.value) {
        if (labelPosition.value.percentage < 0) {
            labelPosition.value.percentage = 0
        } else if (labelPosition.value.percentage > 100) {
            labelPosition.value.percentage = 100
        }
    } else if ('fixedLength' in labelPosition.value) {
        if (labelPosition.value.fixedLength < 0) {
            labelPosition.value.fixedLength = 0
        } else {
            const path = props.getPath()
            if (path) {
                const totalLength = path.getTotalLength()
                if (labelPosition.value.fixedLength > totalLength) {
                    labelPosition.value.fixedLength = totalLength
                }
            }
        }
    }
}
</script>

<template>
    <div class="label-position-editor">
        <button
            @click="toggleLabelPositionFrom"
            class="from-toggle-button"
        >
            {{ labelPosition.from === "source" ? "[source]" : "[target]" }}
        </button>

        <template v-if="'percentage' in labelPosition">
            <input
                v-model.lazy.number="labelPosition.percentage"
                @change="handleNumberChange"
                class="label-position-input"
            >
            <button @click="percentageToFixedLength" class="type-toggle-button">%</button>
        </template>
        <template v-else>
            <input
                v-model.lazy.number="labelPosition.fixedLength"
                @change="handleNumberChange"
                class="label-position-input"
            >
            <button @click="fixedLengthToPercentage" class="type-toggle-button">px</button>
        </template>
    </div>
</template>

<style scoped>
.label-position-editor {
    display: flex;
    justify-content: center;
    height: 1.5rem;
    background-color: var(--background-color);
}

.label-position-input {
    text-align: center;
    width: 3rem;
    font-size: 0.8rem;
    border-right: none;
    border-left: none;
}

.label-position-input:focus {
    border-left: var(--border);
    border-right: var(--border);
}

.from-toggle-button {
    width: 4rem;
    text-align: center;
    border-radius: 0.25rem 0 0 0.25rem;
}

.type-toggle-button {
    width: 2rem;
    text-align: center;
    border-radius: 0 0.25rem 0.25rem 0;
}
</style>
