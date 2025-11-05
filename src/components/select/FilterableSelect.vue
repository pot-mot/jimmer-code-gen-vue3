<script setup lang="ts" generic="T">
import {ref, computed, watch, useTemplateRef} from 'vue'
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {translate} from "@/store/i18nStore.ts";

const model = defineModel<T>({
    required: true,
})
const filterText = defineModel('filterText', {
    required: false,
    default: ''
})

const props = defineProps<{
    options: T[],
    filter: (option: T, filterText: string) => boolean,
    getId: (option: T) => string,
}>()

defineSlots<{
    selected(props: { option: T }): void,
    options(props: { filteredOptions: T[], select: (option: T) => void }): void,
    option(props: { option: T }): void,
    empty(): void,
}>()

// 响应式数据
const isOpen = ref(false)
const currentIndex = ref(-1)
const filterInputRef = useTemplateRef('filterInputRef')
watch(() => isOpen.value, (value) => {
    if (value) filterInputRef.value?.focus()
}, {immediate: true})
watch(() => filterText.value, (value) => {
    if (value) isOpen.value = true
})

// 计算属性：根据查询过滤选项
const filteredOptions = computed(() => {
    if (!filterText.value) {
        return props.options
    }
    return props.options.filter(option =>
        props.filter(option, filterText.value)
    )
})

// 重置 currentIndex 当选项改变时
watch(() => filteredOptions.value, () => {
    currentIndex.value = filteredOptions.value.findIndex(it => props.getId(it) === props.getId(model.value))
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
const selectOption = (option: T) => {
    model.value = option
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
                selectOption(filteredOption)
            }
        }
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
    <Dropdown v-model="isOpen" class="filterable-select" ref="filterableSelect" :class="{'input-focus': isInputFocus}">
        <template #head>
            <div class="select-input" :class="{ open: isOpen }">
                <slot name="selected" :option="model"/>
                <input
                    ref="filterInputRef"
                    v-model="filterText"
                    @focus="handleInputFocus"
                    @blur="handleInputBlur"
                    @keydown="handleKeyDown"
                />
            </div>
        </template>

        <template #body>
            <slot
                v-if="filteredOptions.length > 0"
                name="options"
                :filtered-options="filteredOptions"
                :select="selectOption"
            >
                <ul class="options-list">
                    <li
                        v-for="(option, index) in filteredOptions"
                        :key="props.getId(option)"
                        @mousedown.stop.prevent="selectOption(option)"
                        class="option-item"
                        :class="{
                            selected: props.getId(option) === (model ? props.getId(model) : ''),
                            active: index === currentIndex
                        }"
                    >
                        <slot name="option" :option="option"/>
                    </li>
                </ul>
            </slot>
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

.filterable-select {
    position: relative;
    width: 100%;
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
    min-width: 1rem;
}

.option-item {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
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
</style>
