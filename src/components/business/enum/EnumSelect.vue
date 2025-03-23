<script setup lang="ts">
import {GenModelInput_TargetOf_enums, GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {computed, DeepReadonly, defineEmits, ref} from "vue";
import Comment from "@/components/global/common/Comment.vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import Line from "@/components/global/line/Line.vue";
import LineItem from "@/components/global/line/LineItem.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import Details from "@/components/global/common/Details.vue";

const i18nStore = useI18nStore()

const data = defineModel<{
    enum?: { name: string } | undefined
}>({
    required: true
})

const props = defineProps<{
    subGroups: Array<GenModelInput_TargetOf_subGroups>,
    enums: Array<GenModelInput_TargetOf_enums>
}>()

const filterStr = ref('')

const handleFilter = (value: string) => {
    filterStr.value = value
}

const filteredEnums = computed<Array<GenModelInput_TargetOf_enums>>(() => {
    if (!filterStr.value) return props.enums
    return props.enums.filter(it =>
        it.name.includes(filterStr.value) || it.comment.includes(filterStr.value)
    )
})

const enumGroupedOption = computed<Array<{
    subGroup?: GenModelInput_TargetOf_subGroups | undefined,
    enums: Array<GenModelInput_TargetOf_enums>
}>>(() => {
    const result = []
    for (const genEnum of filteredEnums.value) {
        const subGroup = props.subGroups.find(it => it.name === genEnum.subGroup?.name)
        const index = result.findIndex(it => it.subGroup === subGroup)
        if (index === -1) {
            result.push({
                subGroup,
                enums: [genEnum]
            })
        } else {
            result[index].enums.push(genEnum)
        }
    }
    result.sort((a, b) => {
        if (!a.subGroup && !b.subGroup) {
            return 0
        } else if (!a.subGroup) {
            return -1
        } else if (!b.subGroup) {
            return 1
        } else {
            return a.subGroup.name.localeCompare(b.subGroup.name)
        }
    })
    return result
})

const modelValue = computed<GenModelInput_TargetOf_enums | undefined>({
    set(value: GenModelInput_TargetOf_enums | undefined) {
        if (value) {
            data.value.enum = {name: value.name}
        } else {
            data.value.enum = undefined
        }
    },
    get(): GenModelInput_TargetOf_enums | undefined {
        for (const genEnum of props.enums) {
            if (genEnum.name === data.value.enum?.name) {
                return genEnum
            }
        }
        data.value.enum = undefined
        return undefined
    }
})

const handleClear = () => {
    data.value.enum = undefined
}

const emits = defineEmits<{
    (event: 'create'): any,
    (event: 'edit', genEnum: DeepReadonly<GenModelInput_TargetOf_enums>): any,
}>()

const stopGroupDetailClick = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    return false
}
</script>

<template>
    <Line class="enum-select" style="width: 100%;">
        <LineItem span="auto">
            <el-button v-if="modelValue" :icon="EditPen" @click="emits('edit', modelValue)"/>
            <el-button v-else :icon="Plus" @click="emits('create')"/>
        </LineItem>

        <LineItem>
            <el-select
                v-model="modelValue"
                value-key="name"
                clearable filterable
                :filter-method="handleFilter"
                @clear="handleClear"
                :placeholder="i18nStore.translate('LABEL_EnumSelect_placeholder')"
            >
                <template #label v-if="modelValue">
                    <span :class="modelValue.subGroup ? `model-sub-group-${modelValue.subGroup.name}` : ''">
                        {{ modelValue.name }}
                    </span>
                    <Comment :comment="modelValue.comment"/>
                </template>

                <Details
                    class="enum-select-options"
                    v-for="{subGroup, enums} in enumGroupedOption"
                    :key="subGroup?.name"
                    @click="stopGroupDetailClick" open>
                    <template #title="{handleToggle}">
                        <div
                            v-if="subGroup"
                            @click="handleToggle"
                            :class="`model-sub-group-${subGroup.name}`"
                        >
                            <el-text size="default">
                                {{ subGroup.name }}
                                <Comment :comment="subGroup?.comment"/>
                            </el-text>
                        </div>
                        <div v-else>
                            [{{ i18nStore.translate('LABEL_EnumSelect_noSubGroup') }}]
                        </div>
                    </template>

                    <el-option
                        v-for="genEnum in enums"
                        :key="genEnum.name"
                        :value="genEnum"
                    >
                        <span>{{ genEnum.name }}</span>
                        <Comment :comment="genEnum.comment"/>
                    </el-option>
                </Details>
            </el-select>
        </LineItem>
    </Line>
</template>
