<script setup lang="ts">
import {ref, onMounted, onUnmounted, useTemplateRef} from 'vue'
import IconCaretDown from "@/components/icons/IconCaretDown.vue";

const props = withDefaults(defineProps<{
    disabled?: boolean
}>(), {
    disabled: false
})

const isOpen = ref(false)
const dropdownRef = useTemplateRef("dropdownRef")

// 切换下拉菜单
const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value
    }
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div
        ref="dropdownRef"
        class="dropdown"
        :class="{ 'disabled': disabled, 'open': isOpen }"
    >
        <div class="dropdown-trigger" @click="toggleDropdown">
            <slot name="head"/>
            <div class="dropdown-arrow" :class="{ 'rotated': isOpen }">
                <IconCaretDown/>
            </div>
        </div>

        <transition name="slide">
            <div v-show="isOpen" class="dropdown-menu">
                <slot name="body"/>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    width: 100%;
    min-width: 120px;
    font-family: Arial, sans-serif;
}

.dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s;
}

.dropdown-trigger:hover {
    border-color: #409eff;
}

.dropdown.disabled .dropdown-trigger {
    background-color: #f5f7fa;
    cursor: not-allowed;
    color: #c0c4cc;
}

.dropdown.disabled .dropdown-trigger:hover {
    border-color: #dcdfe6;
}

.dropdown-arrow {
    margin-left: 8px;
    transition: transform 0.2s;
    font-size: 12px;
    color: #909399;
}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.2s, opacity 0.2s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
