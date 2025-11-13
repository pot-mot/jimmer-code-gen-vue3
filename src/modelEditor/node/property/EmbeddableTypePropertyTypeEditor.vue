<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import Dropdown from "@/components/dropdown/Dropdown.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import GroupViewer from "@/modelEditor/viewer/GroupViewer.vue";
import EnumerationViewer from "@/modelEditor/viewer/EnumerationViewer.vue";
import EmbeddableTypeViewer from "@/modelEditor/viewer/EmbeddableTypeViewer.vue";
import EmbeddableTypeIdViewer from "@/modelEditor/viewer/EmbeddableTypeIdViewer.vue";
import EnumerationIdViewer from "@/modelEditor/viewer/EnumerationIdViewer.vue";
import {
    toScalarEmbeddableProperty,
    toScalarEnumProperty,
    toScalarCommonProperty
} from "@/modelEditor/node/property/PropertyConvert.ts";
import {computed, nextTick, ref} from "vue";
import TypePairViewer from "@/modelEditor/viewer/TypePairViewer.vue";
import ColorPreview from "@/components/color/ColorPreview.vue";
import {
    getGroupItemTypeOptionName,
    type GroupTypeOptions,
    type TypeOptions
} from "@/modelEditor/node/property/TypeOption.ts";
import IconEnumeration from "@/components/icons/modelEditor/IconEnumeration.vue";
import IconEmbeddableType from "@/components/icons/modelEditor/IconEmbeddableType.vue";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";

const props = defineProps<{
    embeddableType: DeepReadonly<EmbeddableTypeWithProperties>
}>()

const property = defineModel<EmbeddableTypeProperty>({
    required: true
})

const {
    contextData,
    menuMap,
    executeAsyncBatch,
    waitChangeSync,
} = useModelEditor()

const {
    crossTypeOptions,
} = useTypeMapping()

const filterKeyword = ref<string>("")
const options = computed<TypeOptions>(() => {
    const result: TypeOptions = {
        crossTypes: [],
        groups: []
    }

    const filteredCrossTypes = crossTypeOptions.value.filter(crossType => {
        return (crossType.databaseSource === contextData.model.databaseType || crossType.databaseSource === "ANY") &&
            (crossType.jvmSource === contextData.model.jvmLanguage || crossType.jvmSource === "ANY")
    })

    const keyword = filterKeyword.value.trim().toLowerCase()
    if (keyword.length === 0) {
        result.crossTypes = filteredCrossTypes

        for (const menuItem of menuMap.value.values()) {
            const current: GroupTypeOptions = {
                group: menuItem.group,
                options: []
            }

            for (const enumeration of menuItem.enumerations.values()) {
                current.options.push({type: "Enumeration", enumeration})
            }
            for (const embeddableType of menuItem.embeddableTypes.values()) {
                if (embeddableType.id === props.embeddableType.id) continue
                current.options.push({type: "EmbeddableType", embeddableType})
            }

            if (current.options.length > 0) {
                current.options.sort((a, b) => getGroupItemTypeOptionName(a).localeCompare(getGroupItemTypeOptionName(b)))
                result.groups.push(current)
            }
        }
    } else {
        result.crossTypes = filteredCrossTypes.filter(crossType => {
            return crossType.jvmType.typeExpression.toLowerCase().includes(keyword) ||
                crossType.sqlType.type.toLowerCase().includes(keyword) ||
                crossType.tsType.typeExpression.toLowerCase().includes(keyword)
        })

        for (const menuItem of menuMap.value.values()) {
            const current: GroupTypeOptions = {
                group: menuItem.group,
                options: []
            }

            for (const enumeration of menuItem.enumerations.values()) {
                if (enumeration.name.toLowerCase().includes(keyword) || enumeration.comment.toLowerCase().includes(keyword)) {
                    current.options.push({type: "Enumeration", enumeration})
                }
            }
            for (const embeddableType of menuItem.embeddableTypes.values()) {
                if (embeddableType.id === props.embeddableType.id) continue
                if (embeddableType.name.toLowerCase().includes(keyword) || embeddableType.comment.toLowerCase().includes(keyword)) {
                    current.options.push({type: "EmbeddableType", embeddableType})
                }
            }

            if (current.options.length > 0) {
                current.options.sort((a, b) => getGroupItemTypeOptionName(a).localeCompare(getGroupItemTypeOptionName(b)))
                result.groups.push(current)
            }
        }
    }

    return result
})

const selectBaseType = (typePair: DeepReadonly<CrossType>) => {
    executeAsyncBatch(Symbol("property type to baseType"), async () => {
        property.value = toScalarCommonProperty(property.value, typePair)

        await nextTick()
        await waitChangeSync()
    })
}

const selectEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
    if (
        "enumId" in property.value && property.value.enumId === enumeration.id
    ) return

    executeAsyncBatch(Symbol("property type to enumeration"), async () => {
        property.value = toScalarEnumProperty(property.value, enumeration)

        await nextTick()
        await waitChangeSync()
    })
}

const selectEmbeddableType = (embeddableType: DeepReadonly<EmbeddableType>) => {
    if ("embeddableTypeId" in property.value && property.value.embeddableTypeId === embeddableType.id) return

    executeAsyncBatch(Symbol("property type to embeddableType"), async () => {
        property.value = toScalarEmbeddableProperty(property.value, embeddableType)

        await nextTick()
        await waitChangeSync()
    })
}
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="type-editor-header">
                <div v-if="'enumId' in property" class="type-editor-header-label">
                    <IconEnumeration class="type-editor-header-label-icon"/>
                    <EnumerationIdViewer :id="property.enumId" hide-comment ctrl-focus/>
                </div>
                <div v-if="'embeddableTypeId' in property" class="type-editor-header-label">
                    <IconEmbeddableType class="type-editor-header-label-icon"/>
                    <EmbeddableTypeIdViewer :id="property.embeddableTypeId" hide-comment ctrl-focus/>
                </div>
                <div v-if="'rawType' in property" class="type-editor-header-label">
                    {{ property.rawType }}
                </div>
            </div>
        </template>

        <template #body>
            <div class="options-filter">
                <input v-model="filterKeyword">
            </div>

            <div class="options-container">
                <ul>
                    <li
                        class="select-item"
                        :class="{selected: 'rawType' in property && property.rawType === type.jvmType.typeExpression}"
                        v-for="type in options.crossTypes"
                        @click="selectBaseType(type)"
                    >
                        <TypePairViewer :type-pair="type"/>
                    </li>
                </ul>

                <CollapseDetail
                    v-for="groupOptions in options.groups"
                    :key="groupOptions.group.id"
                    :model-value="true"
                    trigger-position="left"
                    open-trigger="head"
                >
                    <template #head>
                        <div class="group-item">
                            <ColorPreview :value="groupOptions.group.color" class="group-item-color"/>
                            <GroupViewer :group="groupOptions.group"/>
                        </div>
                    </template>

                    <template #body>
                        <ul>
                            <template v-for="option in groupOptions.options">
                                <li
                                    v-if="option.type === 'Enumeration'"
                                    class="select-item"
                                    :class="{selected: 'enumId' in property && option.enumeration.id === property.enumId}"
                                    :key="option.enumeration.id"
                                    @click="selectEnumeration(option.enumeration)"
                                >
                                    <IconEnumeration class="select-item-icon"/>
                                    <EnumerationViewer :enumeration="option.enumeration"/>
                                </li>
                                <li
                                    v-if="option.type === 'EmbeddableType'"
                                    class="select-item"
                                    :class="{selected: 'embeddableTypeId' in property && option.embeddableType.id === property.embeddableTypeId}"
                                    :key="option.embeddableType.id"
                                    @click="selectEmbeddableType(option.embeddableType)"
                                >
                                    <IconEmbeddableType class="select-item-icon"/>
                                    <EmbeddableTypeViewer :embeddable-type="option.embeddableType"/>
                                </li>
                            </template>
                        </ul>
                    </template>
                </CollapseDetail>
            </div>
        </template>
    </Dropdown>
</template>

<style scoped>
.type-editor-header {
    font-size: 0.8rem;
    padding-left: 0.5rem;
    min-height: 1.8rem;
    max-width: 10rem;
    overflow-x: auto;
}

.type-editor-header-label {
    display: flex;
}
.type-editor-header-label > * {
    flex-shrink: 0;
}

.type-editor-header-label-icon {
    margin-top: 0.4rem;
    margin-right: 0.25rem;
}

.options-filter {
    padding: 0.4rem 0.5rem;
    font-size: 0.8rem;
}
.options-filter > input {
    width: 100%;
}

.options-container {
    max-width: 15rem;
    overflow-x: auto;
    max-height: 12rem;
    overflow-y: auto;
}

.select-item {
    padding: 0.2rem 0.5rem 0.2rem 1rem;
    font-size: 0.8rem;
    display: flex;
    cursor: default;
}
.select-item > * {
    flex-shrink: 0;
}

.select-item:hover {
    background-color: var(--background-color-hover);
}

.select-item.selected {
    background-color: var(--primary-color-background);
}

.select-item-icon {
    margin-top: 0.2rem;
    margin-right: 0.25rem;
}

.group-item {
    padding: 0.2rem 0.5rem 0.2rem 0;
    font-size: 0.8rem;
    display: flex;
}
.group-item > * {
    flex-shrink: 0;
}

.group-item-color {
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.2rem;
    margin-right: 0.25rem;
}
</style>
