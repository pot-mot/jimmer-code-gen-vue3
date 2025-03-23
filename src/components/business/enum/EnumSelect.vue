<script setup lang="ts">
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {computed, DeepReadonly, defineEmits, ref} from "vue";
import Comment from "@/components/global/common/Comment.vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import Line from "@/components/global/line/Line.vue";
import LineItem from "@/components/global/line/LineItem.vue";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const data = defineModel<{
    enum?: { name: string } | undefined
}>({
    required: true
})

const props = defineProps<{
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
</script>

<template>
    <Line style="width: 100%;">
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
                    <span :class="modelValue.subGroup ? `model-sub-group-${modelValue.subGroup.name}` : ''">{{ modelValue.name }}</span>
                    <Comment :comment="modelValue.comment"/>
                </template>
                <el-option
                    v-for="genEnum in filteredEnums"
                    :key="genEnum.name"
                    :value="genEnum"
                >
                    <span :class="genEnum.subGroup ? `model-sub-group-${genEnum.subGroup.name}` : ''">{{ genEnum.name }}</span>
                    <Comment :comment="genEnum.comment"/>
                </el-option>
            </el-select>
        </LineItem>
    </Line>
</template>
