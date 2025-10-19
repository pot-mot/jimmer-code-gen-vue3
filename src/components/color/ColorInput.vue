<script setup lang="ts">
import 'vue-color/style.css'
import {SketchPicker} from "vue-color";
import {nextTick, ref, useTemplateRef, watch} from "vue";

const value = defineModel<string>({
    required: true
})

withDefaults(defineProps<{
    presetColors?: string[] | undefined
}>(), {
    presetColors: () => []
})

const colorPreviewRef = useTemplateRef<HTMLDivElement>("colorPreviewRef")
const colorPickerRef = useTemplateRef<InstanceType<typeof SketchPicker>>("colorPickerRef")

const showPicker = ref(false)
const pickerPosition = ref({
    top: 0,
    left: 0,
})

watch(() => showPicker.value, async (value) => {
    await nextTick()
    if (value && colorPreviewRef.value && colorPickerRef.value?.$el) {
        const colorRect = colorPreviewRef.value.getBoundingClientRect()
        const pickerRect = colorPickerRef.value.$el.getBoundingClientRect()

        // 计算水平位置（优先右侧，空间不足则左侧）
        let left = colorRect.left + colorRect.width
        if (left + pickerRect.width > window.innerWidth) {
            left = Math.max(0, colorRect.left - pickerRect.width)
        }
        if (left < 0) left = 0

        // 计算垂直位置（优先下方，空间不足则上方）
        let top = colorRect.top + colorRect.height
        if (top + pickerRect.height > window.innerHeight) {
            top = Math.max(0, colorRect.top - pickerRect.height)
        }
        if (top < 0) top = 0

        pickerPosition.value = { top, left }
    }
})
</script>

<template>
    <div class="color-input">
        <div
            class="color-preview"
            ref="colorPreviewRef"
            @click="showPicker = !showPicker"
            :style="{ backgroundColor: value }"
        />

        <Teleport to="body" :disabled="!showPicker">
            <div
                v-if="showPicker"
                class="picker-mask"
                @click.self="showPicker = false"
            >
                <SketchPicker
                    ref="colorPickerRef"
                    v-model="value"
                    :disableAlpha="true"
                    :presetColors="presetColors"
                    class="color-picker"
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
    width: 1em;
    height: 1em;
    vertical-align: middle;
    user-select: none;
}

.color-preview {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: var(--border);
    border-radius: 3px;
}

.picker-mask {
    position: absolute;
    z-index: var(--mask-z-index);
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100 * var(--vh));
}

.color-picker {
    position: absolute;
}

:deep(.color-picker) .body {
    background-color: var(--background-color);
}

:deep(.color-picker) .vc-input-input {
    background-color: var(--background-color);
    color: var(--text-color);
    outline: none;
    box-shadow: none;
    border-radius: 0;
    border: var(--border);
    border-color: var(--border-color-light);
    text-align: center;
    padding: 0;
}
</style>