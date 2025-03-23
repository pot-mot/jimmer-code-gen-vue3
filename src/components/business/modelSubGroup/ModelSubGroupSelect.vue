<script setup lang="ts">
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {computed, DeepReadonly, defineEmits, ref} from "vue";
import Comment from "@/components/global/common/Comment.vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import Line from "@/components/global/line/Line.vue";
import LineItem from "@/components/global/line/LineItem.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const data = defineModel<{
    subGroup?: { name: string } | undefined
}>({
    required: true
})

const props = defineProps<{
    subGroups: Array<GenModelInput_TargetOf_subGroups>
}>()

const filterStr = ref('')

const handleFilter = (value: string) => {
    filterStr.value = value
}

const filteredSubGroups = computed<Array<GenModelInput_TargetOf_subGroups>>(() => {
    if (!filterStr.value) return props.subGroups
    return props.subGroups.filter(it =>
        it.name.includes(filterStr.value) || it.comment.includes(filterStr.value)
    )
})

const modelValue = computed<GenModelInput_TargetOf_subGroups | undefined>({
    set(value: GenModelInput_TargetOf_subGroups | undefined) {
        if (value) {
            data.value.subGroup = {name: value.name}
        } else {
            data.value.subGroup = undefined
        }
    },
    get(): GenModelInput_TargetOf_subGroups | undefined {
        for (const subGroup of props.subGroups) {
            if (subGroup.name === data.value.subGroup?.name) {
                return subGroup
            }
        }
        data.value.subGroup = undefined
        return undefined
    }
})

const handleClear = () => {
    data.value.subGroup = undefined
}

const emits = defineEmits<{
    (event: 'create'): any,
    (event: 'edit', subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>): any,
}>()
</script>

<template>
    <Line class="model-sub-group-select" style="width: 100%;">
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
                :placeholder="i18nStore.translate('LABEL_ModelSubGroupSelect_placeholder')"
            >
                <template #label v-if="modelValue">
                    <span :style="{color: modelValue.style}">{{ modelValue.name }}</span>
                    <Comment :comment="modelValue.comment"/>
                </template>
                <el-option
                    v-for="subGroup in filteredSubGroups"
                    :key="subGroup.name"
                    :value="subGroup"
                >
                    <span :style="{color: subGroup.style}">{{ subGroup.name }}</span>
                    <Comment :comment="subGroup.comment"/>
                </el-option>
            </el-select>
        </LineItem>
    </Line>
</template>
