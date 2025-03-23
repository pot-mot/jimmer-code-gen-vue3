<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {computed} from "vue";

const i18nStore = useI18nStore()

const props = defineProps<{
    subGroup: GenModelInput_TargetOf_subGroups | undefined
}>()

const {MODEL_EDITOR, MODEL, SELECT} = useModelEditorStore()

const isSelected = computed(() => {
    return MODEL.selectedSubGroupMap.has(props.subGroup?.name)
})

const handleClickLabel = async (e: MouseEvent) => {
    const matchedNodeIds = MODEL.tableNodePairs
        .filter(it => it.first.subGroup?.name === props.subGroup?.name)
        .map(it => it.second.id)

    const matchedEnumNames = MODEL.enums
        .filter(it => it.subGroup?.name === props.subGroup?.name)
        .map(it => it.name)


    if (e.ctrlKey) {
        SELECT.toggleSelectSubGroup(props.subGroup?.name)
        if (isSelected.value) {
            SELECT.select(matchedNodeIds)
            SELECT.selectEnum(...matchedEnumNames)
        } else {
            SELECT.unselect(matchedNodeIds)
            SELECT.unselectEnum(...matchedEnumNames)
        }
    } else {
        SELECT.unselectAll()
        SELECT.selectSubGroup(props.subGroup?.name)
        SELECT.select(matchedNodeIds)
        SELECT.selectEnum(...matchedEnumNames)
    }
}

const handleEdit = (subGroup: GenModelInput_TargetOf_subGroups) => {
    if (props.subGroup) {
        MODEL_EDITOR.editSubGroup(subGroup.name, subGroup)
    }
}

const handleDelete = (subGroup: GenModelInput_TargetOf_subGroups) => {
    deleteConfirm(`${i18nStore.translate("LABEL_DeleteTarget_SubGroup")}【${subGroup.name}】`, () => {
        MODEL_EDITOR.removeSubGroup(subGroup.name)
    })
}
</script>

<template>
    <div class="hover-show menu-item" :class="isSelected ? 'selected' : ''">
        <template v-if="subGroup">
            <el-text :style="{color: subGroup.style}" @click="handleClickLabel">
                {{ subGroup.name }}
                <Comment :comment="subGroup.comment"/>
            </el-text>

            <span class="hover-show-item" style="padding-left: 0.5em;">
                <el-button :icon="EditPen" link type="warning" @click="handleEdit"/>
                <el-button :icon="Delete" link type="danger" @click="handleDelete"/>
            </span>
        </template>
        <template v-else>
            <el-text @click="handleClickLabel">
                [{{ i18nStore.translate("LABEL_SubGroupItem_noSubGroup") }}]
            </el-text>
        </template>
    </div>
</template>
