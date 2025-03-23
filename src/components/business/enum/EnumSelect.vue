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

type SubGroupWithEnums = {
    group: GenModelInput_TargetOf_subGroups | undefined,
    enums: Array<GenModelInput_TargetOf_enums>
}

const props = defineProps<{
    options: Array<SubGroupWithEnums>,
}>()

const filterStr = ref('')

const handleFilter = (value: string) => {
    filterStr.value = value
}

const filteredSubGroupWithEnums = computed<Array<SubGroupWithEnums>>(() => {
    if (!filterStr.value) return props.options
    return props.options.filter(it => {
        return {
            group: it.group,
            enums: it.enums.filter(it => it.name.includes(filterStr.value) || it.comment.includes(filterStr.value))
        }
    })
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
        for (const genEnum of props.options.flatMap(it => it.enums)) {
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
                    v-for="{group, enums} in filteredSubGroupWithEnums"
                    :key="group?.name"
                    @click="stopGroupDetailClick" open>
                    <template #title="{handleToggle}">
                        <div
                            v-if="group"
                            @click="handleToggle"
                            :class="`model-sub-group-${group.name}`"
                        >
                            <el-text size="default">
                                {{ group.name }}
                                <Comment :comment="group?.comment"/>
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
