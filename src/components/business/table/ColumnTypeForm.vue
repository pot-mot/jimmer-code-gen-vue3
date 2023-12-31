<script setup lang="ts">
import {ModelValueProps} from "@/components/global/dialog/DragDialogProps.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableModelInput.ts";
import {ModelValueEmits} from "@/components/global/dialog/DragDialogEmits.ts";
import {ref} from "vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import {GenEnumItemsInput, GenEnumView} from "@/api/__generated/model/static";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {api} from "@/api";
import Comment from "@/components/global/common/Comment.vue";
import {useJDBCTypeStore} from "@/components/business/jdbcType/JDBCTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";

const jdbcTypeStore = useJDBCTypeStore()

const columnDefaultStore = useColumnDefaultStore()

const props = defineProps<
	ModelValueProps<GenTableModelInput_TargetOf_columns> &
	{ enums: GenEnumView[] }
>()

const emits = defineEmits<
	ModelValueEmits<GenTableModelInput_TargetOf_columns> &
	{ (event: "updateEnums"): void }
>()

const popoverOpenState = ref(false)

const handleStopPopoverClose = () => {
	setTimeout(() => {
		popoverOpenState.value = true
	}, 100)
}

const handleTypeCodeChange = () => {
	const typeCode = props.modelValue.typeCode

	const columnDefaults = columnDefaultStore.get(typeCode)
	if (columnDefaults.length == 1) {
		const columnDefault = columnDefaults[0]

		props.modelValue.type = columnDefault.type
		props.modelValue.displaySize = columnDefault.displaySize
		props.modelValue.numericPrecision = columnDefault.numericPrecision
		if (columnDefault.defaultValue) props.modelValue.defaultValue = columnDefault.defaultValue
	} else {
		const type = jdbcTypeStore.map.get(typeCode)
		if (type) {
			props.modelValue.type = type
		}
	}

	handleStopPopoverClose()
}

const enumDialogOpenState = ref(false)

const enumId = ref<number>()

const handleSaveEnum = async (genEnum: GenEnumItemsInput) => {
	const id = await api.enumService.save({body: genEnum})
	enumDialogOpenState.value = false
	if (id != undefined) {
		props.modelValue.enum = { name: genEnum.name }
		enumId.value = id
	}
	emits('updateEnums')
	popoverOpenState.value = true
}

const handleCancelEditEnum = async () => {
	enumDialogOpenState.value = false
	handleStopPopoverClose()
}
</script>

<template>
	<el-popover v-model:visible="popoverOpenState" trigger="click" width="450px">
		<template #reference>
			<el-input readonly :model-value="modelValue.type">
				<template v-if="modelValue.enum != undefined" #prefix>
					【Enum】
				</template>
			</el-input>
		</template>


		<el-form v-if="jdbcTypeStore.isLoaded && columnDefaultStore.isLoaded">
			<el-form-item label="jdbc 类型">
				<el-select
					v-model="modelValue.typeCode"
					@change="handleTypeCodeChange"
					filterable
					style="width: 100%">
					<el-option v-for="type in jdbcTypeStore.list"
							   :label="type.type" :value="type.typeCode"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="生成 DDL 时以字面类型覆盖 jdbc 类型">
				<el-switch v-model="modelValue.overwriteByType"></el-switch>
			</el-form-item>

			<el-form-item label="字面类型">
				<el-input v-model="modelValue.type" :disabled="!modelValue.overwriteByType"></el-input>
			</el-form-item>

			<el-form-item label="长度精度">
				<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
					<span>(</span>
					<span><el-input type="number" v-model="modelValue.displaySize"></el-input></span>
					<span style="padding-left: 0.3em;">,</span>
					<span><el-input type="number" v-model="modelValue.numericPrecision"></el-input></span>
					<span style="padding-left: 0.3em;">)</span>
				</el-text>
			</el-form-item>

			<el-form-item label="映射枚举">
				<el-select :model-value="modelValue.enum" clearable filterable
						   @clear="() => {
							   modelValue.enum = undefined
							   handleStopPopoverClose()
						   }"
						   @change="(value: string) => {
								modelValue.enum = { name: value }
								handleStopPopoverClose()
							}">
					<el-option v-for="genEnum in enums" :value="genEnum.name">
						{{ genEnum.name }}
						<Comment :comment="genEnum.comment"></Comment>
					</el-option>
				</el-select>

				<el-button :icon="modelValue.enum == undefined ?  Plus : EditPen"
						   @click="enumDialogOpenState = true;"></el-button>
			</el-form-item>
		</el-form>
	</el-popover>

	<el-dialog v-model="enumDialogOpenState" append-to-body @close="handleCancelEditEnum">
		<EnumForm :id="enumId" @submit="handleSaveEnum" @cancel="handleCancelEditEnum"></EnumForm>
	</el-dialog>
</template>
