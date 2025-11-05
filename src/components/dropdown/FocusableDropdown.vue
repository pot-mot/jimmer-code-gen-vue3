<script setup lang="ts">
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {ref} from "vue";

const isOpen = defineModel<boolean>({
    required: false,
    default: false
})

withDefaults(defineProps<{
    disabled?: boolean,
    paddingY?: number,
}>(), {
    disabled: false,
    paddingY: 8,
})

const isFocus = ref(false)

const handleFocusIn = () => {
    isFocus.value = true
}

const handleFocusOut = () => {
    isFocus.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.preventDefault()
        isOpen.value = !isOpen.value
    }
}
</script>

<template>
    <Dropdown
        v-model="isOpen"
        :disabled="disabled"
        :padding-y="paddingY"
        tabindex="0"
        @focusin="handleFocusIn"
        @focusout="handleFocusOut"
        @keydown.stop="handleKeydown"
        :class="{focused: isFocus}"
    >
        <template #head>
            <slot name="head"/>
        </template>
        <template #body>
            <slot name="body"/>
        </template>
    </Dropdown>
</template>

<style scoped>
.focused :deep(.dropdown-trigger) {
    border-color: var(--border-color);
}
</style>
