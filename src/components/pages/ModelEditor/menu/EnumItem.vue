<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "@/components/pages/ModelEditor/store/ModelEditorEventBus.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
interface EdgeItem {
	genEnum: GenModelInput_TargetOf_enums
}

const props = defineProps<EdgeItem>()

const handleEdit = () => {
	ModelEditorEventBus.emit('modifyEnum', {name: props.genEnum.name, genEnum: props.genEnum})
}

const handleDelete = () => {
	ModelEditorEventBus.emit('removeEnum', props.genEnum.name)
}
</script>

<template>
	<div>
		<el-text class="hover-show" :type="genEnum.items.length > 0 ? '' : 'warning'">
			{{ genEnum.name }} <template v-if="genEnum.items.length == 0">[无枚举项]</template>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="EditPen" link title="编辑" type="warning" @click="handleEdit"></el-button>
				<el-button :icon="Delete" link title="删除" type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
</template>
