<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {deleteConfirm} from "@/message/confirm.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
    genEnum: GenModelInput_TargetOf_enums
}>()

const {MODEL_EDITOR} = useModelEditorStore()

const handleEdit = () => {
    MODEL_EDITOR.editEnum(props.genEnum.name, props.genEnum)
}

const handleDelete = () => {
	deleteConfirm(`${i18nStore.translate("LABEL_DeleteTarget_Enum")}【${props.genEnum.name}】`, () => {
        MODEL_EDITOR.removeEnum(props.genEnum.name)
	})
}
</script>

<template>
	<div>
		<el-text class="hover-show" :type="genEnum.items.length > 0 ? '' : 'warning'">
			{{ genEnum.name }}
            <Comment :comment="genEnum.comment"></Comment>
			<template v-if="genEnum.items.length === 0">[无枚举项]</template>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="EditPen" link type="warning" @click="handleEdit"></el-button>
				<el-button :icon="Delete" link type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
</template>
