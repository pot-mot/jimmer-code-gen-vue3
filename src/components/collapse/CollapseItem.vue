<script setup lang="ts">
import {onMounted, useTemplateRef, watch} from 'vue'
import IconCaretDown from "@/components/icons/IconCaretDown.vue";

const isOpen = defineModel<boolean>({required: false, default: false})

const props = withDefaults(defineProps<{
    minHeight: string,
    maxHeight: string,
    triggerPosition?: 'left' | 'right' | undefined,
    transitionDuration?: number | undefined,
}>(), {
    triggerPosition: 'right',
    transitionDuration: 300,
})

const bodyRef = useTemplateRef("bodyRef")

onMounted(() => {
    if (bodyRef.value) {
        if (isOpen.value) {
            bodyRef.value.style.maxHeight = `min(${bodyRef.value.scrollHeight}px, ${props.maxHeight})`
        } else {
            bodyRef.value.style.maxHeight = props.minHeight
        }

        bodyRef.value.style.transition = `max-height ${props.transitionDuration}ms ease-out`
    }
})

watch(() => isOpen.value, () => {
    if (bodyRef.value) {
        if (isOpen.value) {
            bodyRef.value.style.maxHeight = `min(${bodyRef.value.scrollHeight}px, ${props.maxHeight})`
        } else {
            bodyRef.value.style.maxHeight = props.minHeight
        }
    }
})
</script>

<template>
    <div class="collapse-item-container" :class="`caret-${triggerPosition}`">
        <div
            class="caret-wrapper"
            v-if="triggerPosition === 'left'"
            @click="isOpen = !isOpen"
            @touchend.prevent="isOpen = !isOpen"
        >
            <IconCaretDown
                class="caret left"
                :class="{ open: isOpen }"
            />
        </div>

        <div class="collapse-item-body" ref="bodyRef">
            <slot/>
        </div>

        <div
            class="caret-wrapper"
            v-if="triggerPosition === 'right'"
            @click="isOpen = !isOpen"
            @touchend.prevent="isOpen = !isOpen"
        >
            <IconCaretDown
                class="caret right"
                :class="{ open: isOpen }"
            />
        </div>
    </div>
</template>

<style scoped>
.collapse-item-body {
    overflow: auto;
}

.caret-wrapper {
    cursor: pointer;
}

.caret-left {
    display: grid;
    grid-template-columns: 1rem calc(100% - 1rem);
}

.caret-right {
    position: relative;
    display: grid;
    grid-template-columns: calc(100% - 1rem) 1rem;
}

.caret-wrapper > .caret {
    position: absolute;
    top: 50%;
    transition: transform v-bind(transitionDuration+ 'ms') ease;
}

.caret-wrapper > .caret.left {
    transform: translateY(-50%) rotate(-90deg);
}

.caret-wrapper > .caret.right {
    transform: translateY(-50%) rotate(90deg);
}

.caret-wrapper > .caret.open {
    transform: translateY(-50%) rotate(0);
}
</style>