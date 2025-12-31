<script setup lang="ts">
import {ref, useTemplateRef, nextTick, watch} from 'vue'
import IconCaretDown from "@/components/icons/IconCaretDown.vue";

const isOpen = defineModel<boolean>({
    required: false,
    default: false
})

const props = withDefaults(defineProps<{
    disabled?: boolean,
    paddingY?: number,
}>(), {
    disabled: false,
    paddingY: 8,
})

const dropdownRef = useTemplateRef("dropdownRef")
const dropdownBodyMaskRef = useTemplateRef("dropdownBodyMaskRef")
const dropdownBodyRef = useTemplateRef("dropdownBodyRef")

const menuPosition = ref({
    top: 0,
    left: 0
})

// 切换下拉菜单
const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value
    }
}

watch(() => isOpen.value, async (value) => {
    await nextTick()
    if (value && dropdownRef.value && dropdownBodyMaskRef.value && dropdownBodyRef.value) {
        if (!document.activeElement || document.activeElement === document.body) {
            dropdownBodyMaskRef.value.focus()
        }

        const triggerRect = dropdownRef.value.getBoundingClientRect()
        const menuRect = dropdownBodyRef.value.getBoundingClientRect()

        // 计算水平位置（优先左对齐，但确保不会超出右边界）
        let left = triggerRect.left
        // 确保菜单不会超出右边界
        if (left + menuRect.width > window.innerWidth) {
            left = Math.max(0, window.innerWidth - menuRect.width)
        }

        // 计算垂直位置（优先下方，空间不足则上方）
        let top = triggerRect.bottom + props.paddingY
        if (top + menuRect.height > window.innerHeight) {
            top = triggerRect.top - menuRect.height - props.paddingY
        }

        menuPosition.value = {
            top,
            left
        }
    }
})
</script>

<template>
    <div
        ref="dropdownRef"
        class="dropdown"
        :class="{ disabled, open: isOpen }"
    >
        <div class="dropdown-trigger" @click="toggleDropdown">
            <div class="dropdown-header">
                <slot name="head"/>
            </div>
            <IconCaretDown  class="dropdown-arrow" :class="{ 'rotated': isOpen }"/>
        </div>

        <Teleport to="body">
            <div
                v-if="isOpen"
                ref="dropdownBodyMaskRef"
                class="dropdown-mask"
                tabindex="-1"
                @keydown.esc="isOpen = false"
                @click.self="isOpen = false"
            >
                <div
                    ref="dropdownBodyRef"
                    class="dropdown-body"
                    :style="{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }"
                >
                    <slot name="body"/>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
}

.dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    cursor: pointer;
}

.dropdown-header {
    width: 100%;
}

.disabled .dropdown-trigger {
    cursor: not-allowed;
    pointer-events: none;
}

.open .dropdown-trigger {
    border-color: var(--border-color);
}

.dropdown-arrow {
    flex-shrink: 0;
    margin-left: 0.5em;
    transition: transform 0.3s;
}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

.dropdown-mask {
    position: absolute;
    z-index: var(--mask-z-index);
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100 * var(--vh));
}

.dropdown-body {
    position: absolute;
    border: var(--border);
    border-color: var(--border-color-light);
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: var(--background-color);
}
</style>
