<script setup lang="ts" generic="T">
import {ref, computed, watch, useTemplateRef, onBeforeMount} from 'vue'
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {translate} from "@/store/i18nStore.ts";

const model = defineModel<T>({
    required: true,
})
const filterText = defineModel('filterText', {
    required: false,
    default: ''
})
const currentIndex = defineModel<number>('currentIndex', {
    required: false,
    default: -1
})

onBeforeMount(() => {
    currentIndex.value = props.options.findIndex(it => props.getId(it) === props.getId(model.value))
})

const props = defineProps<{
    getId: (option: T) => string,
    options: T[],
    canFilter: true,
    filter: (option: T, filterText: string) => boolean,
} | {
    getId: (option: T) => string,
    options: T[],
    canFilter?: false,
    filter?: (option: T, filterText: string) => boolean,
}>()

defineSlots<{
    selected(props: { option: T }): void,
    afterInput(): void,
    option(props: { option: T }): void,
    empty(): void,
}>()

// 响应式数据
const isOpen = ref(false)
const filterInputRef = useTemplateRef('filterInputRef')
watch(() => isOpen.value, (value) => {
    if (value) filterInputRef.value?.focus()
}, {immediate: true})
watch(() => filterText.value, (value) => {
    if (value) isOpen.value = true
})

// 计算属性：根据查询过滤选项
const filteredOptions = computed(() => {
    if (!filterText.value || !props.canFilter) {
        return props.options
    }
    return props.options.filter(option =>
        props.filter(option, filterText.value)
    )
})

const closeSelect = () => {
    filterText.value = ''
    isOpen.value = false
}

const isInputFocus = ref(false)
const handleInputFocus = () => {
    isInputFocus.value = true
}
const handleInputBlur = async () => {
    isInputFocus.value = false
    closeSelect()
}

// 选择选项
const selectOption = (option: T, index: number) => {
    model.value = option
    currentIndex.value = index
    closeSelect()
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        closeSelect()
    } else if (e.key === 'Enter') {
        e.preventDefault()
        if (!isOpen.value) {
            isOpen.value = true
            return
        }
        if (currentIndex.value >= 0 && filteredOptions.value.length > 0 && currentIndex.value < filteredOptions.value.length) {
            const filteredOption = filteredOptions.value[currentIndex.value]
            if (filteredOption !== undefined && model.value !== filteredOption) {
                selectOption(filteredOption, currentIndex.value)
            }
        }
        closeSelect()
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isOpen.value) {
            isOpen.value = true
        }
        if (filteredOptions.value.length > 0) {
            currentIndex.value = (currentIndex.value + 1) % filteredOptions.value.length
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (!isOpen.value) {
            isOpen.value = true
        }
        if (filteredOptions.value.length > 0) {
            currentIndex.value = currentIndex.value <= 0
                ? filteredOptions.value.length - 1
                : currentIndex.value - 1
        }
    }
}
</script>

<template>
    <Dropdown v-model="isOpen" ref="filterableSelect" :class="{'input-focus': isInputFocus}">
        <template #head>
            <div class="select-input" :class="{ open: isOpen }">
                <slot name="selected" :option="model">
                    <span class="option-view">{{ model }}</span>
                </slot>
                <input
                    ref="filterInputRef"
                    v-model="filterText"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    @keydown="handleKeyDown"
                    :readonly="!props.canFilter"
                    :style="{width: props.canFilter ? (isInputFocus ? '100%' : 0) : 0}"
                />
                <span class="after-input-wrapper">
                    <slot name="afterInput"/>
                </span>
            </div>
        </template>

        <template #body>
            <ul class="options-list" v-if="filteredOptions.length > 0">
                <li
                    v-for="(option, index) in filteredOptions"
                    :key="props.getId(option)"
                    @mousedown.stop.prevent="selectOption(option, index)"
                    class="option-item"
                    :class="{
                        selected: props.getId(option) === (model ? props.getId(model) : ''),
                        active: index === currentIndex
                    }"
                >
                    <slot name="option" :option="option">
                        <span class="option-view">{{ option }}</span>
                    </slot>
                </li>
            </ul>
            <slot v-else name="empty">
                <div class="empty-tip">
                    {{ translate("no_option_tip") }}
                </div>
            </slot>
        </template>
    </Dropdown>
</template>

<style scoped>
.input-focus :deep(.dropdown-trigger) {
    border-color: var(--border-color);
}

.select-input {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
}

.select-input input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0;
    background: none;
}

.option-item {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.option-view {
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
}

.option-item:hover,
.option-item.active {
    background-color: var(--background-color-hover);
}

.option-item.selected {
    color: var(--primary-color)
}

.empty-tip {
    padding: 0.5rem;
}

.after-input-wrapper {
    display: flex;
    align-items: center;
}
</style>
