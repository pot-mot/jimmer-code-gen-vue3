<script setup lang="ts">
import {computed, nextTick, onMounted, ref, useTemplateRef, watch} from "vue";
import {getTextBlockSize} from "@/components/input/textSize.ts";
import {vTapInput} from "@/components/input/vTabInput.ts";
import {calculatePadding, type PaddingData} from "@/components/input/paddingCalculate.ts";

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

const textareaRef = useTemplateRef<HTMLTextAreaElement>("textareaRef")
const innerValue = ref<string>(modelValue.value)

const width = ref(0)
const height = ref(0)

const emits = defineEmits<{
    (event: "resize", size: {width: number, height: number}): void
}>()

const updateTextSize = () => {
    if (!textareaRef.value) return
    const {width: innerWidth, height: innerHeight} = getTextBlockSize(innerValue.value, textareaRef.value)
    width.value = (innerWidth <= 0 ? 1 : innerWidth) + props.borderWidth * 2 + fullPadding.value.left + fullPadding.value.right
    height.value = (innerHeight < props.fontSize ? props.fontSize : innerHeight) + props.borderWidth * 2 + fullPadding.value.top + fullPadding.value.bottom
    emits("resize", {width: width.value, height: height.value})
}

const handleComposition = (e: CompositionEvent) => {
    if (!textareaRef.value) return
    const start = textareaRef.value.selectionStart ?? innerValue.value.length
    const text = innerValue.value.slice(0, start) + e.data + innerValue.value.slice(start)
    const {width: innerWidth, height: innerHeight} = getTextBlockSize(text, textareaRef.value)
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
    if (!textareaRef.value) return
    modelValue.value = innerValue.value
}

const handleBlur = () => {
    if (innerValue.value !== modelValue.value) {
        innerValue.value = modelValue.value
    }
    isFocus.value = false
}

defineExpose({el: textareaRef, isFocus})
</script>

<template>
    <textarea
        class="fit-size-block-input"
        ref="textareaRef"
        :style="{
            paddingLeft: `${fullPadding.left}px`,
            paddingRight: `${fullPadding.right}px`,
            paddingTop: `${fullPadding.top}px`,
            paddingBottom: `${fullPadding.bottom}px`,
            borderWidth: `${borderWidth}px`,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            width: `${width}px`,
            height: `${height}px`,
            cursor: isFocus ? 'text' : 'default'
        }"
        v-model="innerValue"
        @focus="handleFocus"
        @change="handleChange"
        @blur="handleBlur"
        v-tap-input

        @compositionstart="updateTextSize"
        @compositionupdate="handleComposition"
        @compositionend="updateTextSize"
    />
</template>
