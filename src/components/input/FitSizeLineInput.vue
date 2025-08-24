<script setup lang="ts">
import {computed, nextTick, onMounted, ref, useTemplateRef, watch} from "vue";
import {getTextLineSize} from "@/components/input/textSize.ts";
import {calculatePadding, PaddingData} from "@/components/input/paddingCalculate.ts";

const isFocus = ref(false)

const props = withDefaults(
    defineProps<{
        padding?: PaddingData,
        borderWidth?: number,
        fontSize?: number,
        lineHeight?: number,
    }>(), {
        padding: 8,
        borderWidth: 1,
        fontSize: 16,
        lineHeight: 24,
    }
)

const modelValue = defineModel<string>({
    required: true,
})

const fullPadding = computed(() => calculatePadding(props.padding))

const inputRef = useTemplateRef<HTMLInputElement>("inputRef")
const innerValue = ref<string>(modelValue.value)

const width = ref(0)
const height = ref(0)

const emits = defineEmits<{
    (event: "resize", size: {width: number, height: number}): void
}>()

const updateTextSize = () => {
    if (!inputRef.value) return;
    const {width: innerWidth, height: innerHeight} = getTextLineSize(innerValue.value, inputRef.value)
    width.value = (innerWidth <= 0 ? 1 : innerWidth) + props.borderWidth * 2 + fullPadding.value.left + fullPadding.value.right
    height.value = (innerHeight < props.fontSize ? props.fontSize : innerHeight) + props.borderWidth * 2 + fullPadding.value.top + fullPadding.value.bottom
    emits("resize", {width: width.value, height: height.value})
}

const handleComposition = (e: CompositionEvent) => {
    if (!inputRef.value) return
    const start = inputRef.value.selectionStart ?? innerValue.value.length
    const text = innerValue.value.slice(0, start) + e.data + innerValue.value.slice(start)
    const {width: innerWidth, height: innerHeight} = getTextLineSize(text, inputRef.value)
    width.value = (innerWidth <= 0 ? 1 : innerWidth) + props.borderWidth * 2 + fullPadding.value.left + fullPadding.value.right
    height.value = (innerHeight < props.fontSize ? props.fontSize : innerHeight) + props.borderWidth * 2 + fullPadding.value.top + fullPadding.value.bottom
    emits("resize", {width: width.value, height: height.value})
}

onMounted(() => {
    nextTick(() => {
        updateTextSize()
    })
})

watch(() => innerValue.value, () => {
    nextTick(() => {
        updateTextSize()
    })
})

watch(() => modelValue.value, (newVal) => {
    innerValue.value = newVal
})

const handleFocus = () => {
    if (isFocus.value) return
    isFocus.value = true
}

const handleChange = () => {
    if (!inputRef.value) return
    modelValue.value = innerValue.value
}

const handleEnterKeyDown = () => {
    if (!inputRef.value) return
    modelValue.value = innerValue.value
    inputRef.value.blur()
}

const handleBlur = () => {
    if (innerValue.value !== modelValue.value) {
        innerValue.value = modelValue.value
    }
    isFocus.value = false
}

defineExpose({el: inputRef, isFocus})
</script>

<template>
    <input
        class="fit-size-line-input"
        ref="inputRef"
        :style="{
             paddingLeft: `${fullPadding.left}px`,
            paddingRight: `${fullPadding.right}px`,
            paddingTop: `${fullPadding.top}px`,
            paddingBottom: `${fullPadding.bottom}px`,
            borderWidth: `${props.borderWidth}px`,
            fontSize: `${props.fontSize}px`,
            lineHeight: `${lineHeight}px`,
            width: `${width}px`,
            height: `${height}px`,
            cursor: isFocus ? 'text' : 'default'
        }"
        v-model="innerValue"
        @focus="handleFocus"
        @change="handleChange"
        @keydown.enter="handleEnterKeyDown"
        @blur="handleBlur"

        @compositionstart="updateTextSize"
        @compositionupdate="handleComposition"
        @compositionend="updateTextSize"
    />
</template>
