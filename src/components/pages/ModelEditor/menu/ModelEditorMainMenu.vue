<script lang="ts" setup>
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import TableItem from "./TableItem.vue";
import AssociationItem from "./AssociationItem.vue";
import Details from "@/components/global/common/Details.vue";
import EnumItem from "@/components/pages/ModelEditor/menu/EnumItem.vue";
import {computed, ref} from 'vue'
import {
    AssociationItemShowType,
    AssociationItemShowType_CONSTANTS
} from "@/components/pages/ModelEditor/menu/AssociationItemShowType.ts";

const {MODEL, MODEL_DIALOG_STATE, VIEW} = useModelEditorStore()

const associationItemShowType = ref<AssociationItemShowType>('NAME')

const toggleEdgeShow = () => {
    const currentIndex = AssociationItemShowType_CONSTANTS.indexOf(associationItemShowType.value)
    associationItemShowType.value = AssociationItemShowType_CONSTANTS[currentIndex + 1 < AssociationItemShowType_CONSTANTS.length ? currentIndex + 1 : 0]
}

const formattedEdgeShowType = computed(() => {
    switch (associationItemShowType.value) {
        case "NAME":
            return "显示：名称"
        case "TABLE":
            return "显示：连接表"
        case "COLUMN":
            return "显示：连接列"
    }
})
</script>

<template>
    <div>
        <el-button style="margin-bottom: 0.5em;" @click="() => MODEL_DIALOG_STATE.dataSourceLoadMenuOpenState = true">
            从数据源导入
        </el-button>
        <el-button style="margin-bottom: 0.5em;" @click="() => MODEL_DIALOG_STATE.modelLoadMenuOpenState = true">
            从已持久化的模型导入
        </el-button>

        <Details open>
            <template #title>
                <div style="height: 2em; line-height: 2em;">
                    <el-text>Tables</el-text>
                    <el-button
                        style="margin-left: 0.5em;"
                        @click="ModelEditorEventBus.emit(
							'createTable',
							{options: {x: VIEW.getCenterPoint().x * 3/4, y: VIEW.getCenterPoint().y * 3/4}}
						)">
                        创建表
                    </el-button>
                </div>
            </template>

            <div style="padding-bottom: 1em;">
                <TableItem
                    v-for="{first: table, second: node} in MODEL.tableNodePairs"
                    :key="node.id"
                    :table="table"
                    :node="node"/>
            </div>
        </Details>

        <Details open>
            <template #title>
                <div style="height: 2em; line-height: 2em;">
                    <el-text>Associations</el-text>
                    <el-button style="margin-left: 0.5em;" @click="toggleEdgeShow">{{formattedEdgeShowType}}</el-button>
                </div>
            </template>

            <div style="padding-bottom: 1em;">
                <AssociationItem
                    v-for="{first: association, second: edge} in MODEL.associationEdgePairs"
                    :key="edge.id"
                    :association="association"
                    :edge="edge"
                    :show-type="associationItemShowType"/>
            </div>
        </Details>

        <Details open>
            <template #title>
                <div style="height: 2em; line-height: 2em;">
                    <el-text>Enums</el-text>
                    <el-button style="margin-left: 0.5em;" @click="ModelEditorEventBus.emit('createEnum')">创建枚举
                    </el-button>
                </div>
            </template>

            <div style="padding-bottom: 1em;" v-if="MODEL.isLoaded">
                <EnumItem v-for="genEnum in MODEL._model().enums"
                          :key="genEnum.name + genEnum.comment"
                          :gen-enum="genEnum"/>
            </div>
        </Details>
    </div>
</template>
