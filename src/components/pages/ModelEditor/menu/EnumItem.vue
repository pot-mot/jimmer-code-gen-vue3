<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {ModelEditorEventBus} from "@/store/modelEditor/ModelEditorEventBus.ts";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

import {deleteConfirm} from "@/message/confirm.ts";

interface EdgeItem {
	genEnum: GenModelInput_TargetOf_enums
}

const props = defineProps<EdgeItem>()

const handleEdit = () => {
	ModelEditorEventBus.emit('editEnum', {id: props.genEnum.name, genEnum: props.genEnum})
}

const handleDelete = () => {
	deleteConfirm(`【${props.genEnum.name}】`, () => {
		ModelEditorEventBus.emit('removeEnum', {id: props.genEnum.name})
	})
}
</script>

<template>
	<div>
		<el-text class="hover-show" :type="genEnum.items.length > 0 ? '' : 'warning'">
			{{ genEnum.name }}
			<template v-if="genEnum.items.length === 0">[无枚举项]</template>

			<span class="hover-show-item" style="padding-left: 0.5em;">
				<el-button :icon="EditPen" link type="warning" @click="handleEdit"></el-button>
				<el-button :icon="Delete" link type="danger" @click="handleDelete"></el-button>
			</span>
		</el-text>
	</div>
</template>
