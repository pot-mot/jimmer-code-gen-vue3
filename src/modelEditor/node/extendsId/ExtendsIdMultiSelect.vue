<script setup lang="ts">
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";
import MappedSuperClassIdViewer from "@/modelEditor/viewer/MappedSuperClassIdViewer.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {computed} from "vue";

const {contextData, inheritInfo} = useModelEditor()

const props = defineProps<{
    type: "Abstract" | "Concrete"
    id: string,
}>()

const mappedSuperClassOptions = computed(() => {
    const result: DeepReadonly<MappedSuperClassWithProperties>[] = []
    if (props.type === "Concrete") {
        for (const mappedSuperClass of contextData.value.mappedSuperClassMap.values() ?? []) {
            result.push(mappedSuperClass)
        }
    } else if (props.type === "Abstract") {
        const inheritItem = inheritInfo.value.abstractInheritInfoMap.get(props.id)
        if (!inheritItem) return result
        for (const mappedSuperClass of contextData.value.mappedSuperClassMap.values() ?? []) {
            if (
                mappedSuperClass.id !== props.id &&
                !inheritItem.allAbstractChildIdSet.has(mappedSuperClass.id)
            ) {
                result.push(mappedSuperClass)
            }
        }
    }
    return result
})

const mappedSuperClassIds = defineModel<string[]>({
    required: true
})


const toggleSelect = (id: string) => {
    const index = mappedSuperClassIds.value.findIndex(it => it === id)
    if (index !== -1) {
        mappedSuperClassIds.value.splice(index, 1)
    } else {
        mappedSuperClassIds.value.push(id)
    }
}
</script>

<template>
    <Dropdown class="mapped-super-class-select">
        <template #head>
            <ul>
                <li v-for="id in mappedSuperClassIds" class="selected-item">
                    <MappedSuperClassIdViewer :id="id" hide-comment ctrl-focus/>
                    <span class="warning-info" v-if="inheritInfo.circularReferences.has(id)">
                        [Circular Reference]
                    </span>
                    <IconClose class="remove-button" @click.stop="toggleSelect(id)"/>
                </li>
            </ul>
        </template>
        <template #body>
            <div
                v-for="mappedSuperClass in mappedSuperClassOptions"
                @click="toggleSelect(mappedSuperClass.id)"
                class="mapped-super-class-select-option"
                :class="{selected: mappedSuperClassIds.includes(mappedSuperClass.id)}"
            >
                <MappedSuperClassViewer :mapped-super-class="mappedSuperClass"/>
            </div>
            <div
                v-if="mappedSuperClassOptions.length === 0"
                class="mapped-super-class-select-empty"
            >
                No Options
            </div>
        </template>
    </Dropdown>
</template>

<style scoped>
.mapped-super-class-select .selected-item {
    border: var(--border);
    border-color: var(--background-color-hover);
    border-radius: var(--border-radius);
    padding: 0 0.25rem;
    font-size: 0.9rem;
}

.mapped-super-class-select .remove-button {
    cursor: pointer;
    margin-left: 0.25rem;
}

.mapped-super-class-select .remove-button:hover {
    --icon-color: var(--danger-color);
}

.mapped-super-class-select-option {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.mapped-super-class-select-option:hover {
    background-color: var(--background-color-hover);
}

.mapped-super-class-select-option.selected {
    background-color: var(--primary-color);
}

.mapped-super-class-select-option.selected :deep(.name-comment-viewer),
.mapped-super-class-select-option.selected :deep(.name-comment-viewer) > .comment {
    color: var(--text-color);
}

.mapped-super-class-select-empty {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
}

.warning-info {
    font-size: 0.75rem;
    padding: 0 0.5rem;
    color: var(--warning-color);
}
</style>
