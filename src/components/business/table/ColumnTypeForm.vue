<script setup lang="ts">
import {ModelValueProps} from "@/components/global/dialog/DragDialogProps.ts";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {ModelValueEmits} from "@/components/global/dialog/DragDialogEmits.ts";
import {computed, ref} from "vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import {GenEnumItemsInput, GenEnumView} from "@/api/__generated/model/static";
import EnumForm from "@/components/business/enum/EnumForm.vue";
import {api} from "@/api";
import Comment from "@/components/global/common/Comment.vue";

const props = defineProps<
	ModelValueProps<GenTableColumnsInput_TargetOf_columns> &
	{
		databaseTypeObj: { [key: string]: number },
		enums: GenEnumView[]
	}
>()

const emits = defineEmits<
	ModelValueEmits<GenTableColumnsInput_TargetOf_columns> &
	{ (event: "updateEnums"): void }
>()

const databaseTypes = computed(() => {
	return Object.entries(props.databaseTypeObj).map(entry => {
		return {
			type: entry[0],
			typeCode: entry[1]
		}
	})
})

const databaseTypeMaps = computed(() => {
	const map = new Map<number, string>()
	databaseTypes.value.forEach(type => {
		map.set(type.typeCode, type.type)
	})
	return map
})

const databaseType = computed({
	get: () => {
		return {
			type: props.modelValue.type,
			typeCode: props.modelValue.typeCode
		}
	},
	set: (value: { type: string, typeCode: number }) => {
		props.modelValue.type = value.type
		props.modelValue.typeCode = value.typeCode
	}
})

const enumDialogOpenState = ref(false)

const editEnumId = ref<number>()

const handleSaveEnum = async (genEnum: GenEnumItemsInput) => {
	const id = await api.enumService.save({body: genEnum})
	enumDialogOpenState.value = false
	if (!editEnumId.value) {
		props.modelValue.enumId = id
	}
	emits('updateEnums')
	popoverOpenState.value = true
}

const handleCancelEditEnum = async () => {
	enumDialogOpenState.value = false
	popoverOpenState.value = true
}

const popoverOpenState = ref(false)

const handleStopPopoverClose = () => {
	setTimeout(() => {
		popoverOpenState.value = true
	}, 200)
}
</script>

<template>
	<el-popover v-model:visible="popoverOpenState" trigger="click" width="450px">
		<template #reference>
			<el-text>
				<el-input readonly :model-value="modelValue.type">
					<template v-if="modelValue.enumId" #prefix>
						【Enum】
					</template>
				</el-input>
			</el-text>
		</template>


		<el-form>
			<el-form-item label="字面类型">
				<el-input v-model="modelValue.type"></el-input>
			</el-form-item>

			<el-form-item label="jdbc 类型">
				<el-select
					:model-value="databaseType.typeCode"
					@change="
				(typeCode: number) => {
					databaseType = {
						type: databaseTypeMaps.get(typeCode)!,
						typeCode
					}
					handleStopPopoverClose()
				}"
					clearable filterable
					style="width: 100%">
					<el-option v-for="type in databaseTypes"
							   :label="type.type" :value="type.typeCode"></el-option>
				</el-select>
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
				<el-select v-model="modelValue.enumId" clearable filterable @change="handleStopPopoverClose()">
					<el-option v-for="genEnum in enums" :label="genEnum.name" :value="genEnum.id">
						{{ genEnum.name }} <Comment :comment="genEnum.comment"></Comment>
					</el-option>
				</el-select>

				<el-button :icon="modelValue.enumId ? EditPen : Plus"
						   @click="enumDialogOpenState = true; editEnumId = modelValue.enumId"></el-button>
			</el-form-item>
		</el-form>
	</el-popover>

	<el-dialog v-model="enumDialogOpenState" append-to-body>
		<EnumForm :id="editEnumId" @submit="handleSaveEnum" @cancel="handleCancelEditEnum"></EnumForm>
	</el-dialog>
</template>