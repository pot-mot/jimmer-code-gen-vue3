<script setup lang="ts">
import 'vue-color/style.css'
import {ChromePicker} from "vue-color";
import {ref, useTemplateRef, watch} from "vue";

const value = defineModel<string>({
    required: true
})

const colorPreviewRef = useTemplateRef<HTMLDivElement>("colorPreviewRef")

const showPicker = ref(false)
const pickerPosition = ref({
    top: 0,
    left: 0,
})

watch(() => showPicker.value, (value) => {
    if (value && colorPreviewRef.value) {
        const colorRect = colorPreviewRef.value.getBoundingClientRect()
        const pickerWidth = 225  // ChromePicker 默认宽度
        const pickerHeight = 240 // ChromePicker 默认高度

        // 计算水平位置（优先右侧，空间不足则左侧）
        let left = colorRect.left + colorRect.width
        if (left + pickerWidth > window.innerWidth) {
            left = Math.max(0, colorRect.left - pickerWidth)
        }

        // 计算垂直位置（优先下方，空间不足则上方）
        let top = colorRect.top + colorRect.height
        if (top + pickerHeight > window.innerHeight) {
            top = Math.max(0, colorRect.top - pickerHeight)
        }

        pickerPosition.value = { top, left }
    }
})
</script>

<template>
    <div class="color-input">
        <div class="color-preview" ref="colorPreviewRef" @click="showPicker = !showPicker" :style="{ backgroundColor: value }"/>

        <Teleport to="body">
            <div v-if="showPicker" class="picker-mask" @click.self="showPicker = false">
                <ChromePicker
                    v-model="value"
                    :disableAlpha="true"
                    class="chrome-picker"
                    :style="{
                        top: `${pickerPosition.top}px`,
                        left: `${pickerPosition.left}px`,
                    }"
                />
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.color-input {
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: var(--border);
    vertical-align: middle;
    user-select: none;
}

.color-preview {
    cursor: pointer;
    width: 100%;
    height: 100%;
}

.picker-mask {
    position: absolute;
    z-index: var(--picker-z-index);
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100 * var(--vh));
}

.chrome-picker {
    position: absolute;
}

:deep(.chrome-picker) .body {
    background-color: var(--background-color);
}

:deep(.chrome-picker) .vc-input-input {
    background-color: var(--background-color);
    color: var(--text-color);
    outline: none;
    box-shadow: none;
    border-radius: 0;
    border: var(--border);
    border-color: var(--background-color-hover);
}
</style>