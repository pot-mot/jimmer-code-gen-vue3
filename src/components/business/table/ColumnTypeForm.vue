<script setup lang="ts">
import {ModelValueProps} from "@/components/global/dialog/DragDialogProps.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";
import {ModelValueEmits} from "@/components/global/dialog/DragDialogEmits.ts";
import {ref, watch} from "vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import {useJdbcTypeStore} from "@/components/business/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";

const jdbcTypeStore = useJdbcTypeStore()

const columnDefaultStore = useColumnDefaultStore()

const props = defineProps<
	ModelValueProps<GenTableModelInput_TargetOf_columns> &
	{ enumNames: string[] }
>()

const emits = defineEmits<
	ModelValueEmits<GenTableModelInput_TargetOf_columns> &
	{
		(event: "editEnum", name: string): void,
		(event: "createEnum"): void,
	}
>()

const popoverOpenState = ref(false)

const handleTypeCodeChange = () => {
	const typeCode = props.modelValue.typeCode

	const columnDefaults = columnDefaultStore.get(typeCode)

	if (columnDefaults.length == 1) {
		const columnDefault = columnDefaults[0]

		props.modelValue.overwriteByRaw = true
		props.modelValue.rawType = columnDefault.type
		props.modelValue.displaySize = columnDefault.displaySize
		props.modelValue.numericPrecision = columnDefault.numericPrecision
		if (columnDefault.defaultValue) props.modelValue.defaultValue = columnDefault.defaultValue
	} else {
		const type = jdbcTypeStore.map.get(typeCode)
		if (type) {
			props.modelValue.rawType = type
		}
		props.modelValue.overwriteByRaw = false
		props.modelValue.displaySize = 0
		props.modelValue.numericPrecision = 0
	}
}

watch(() => props.modelValue.typeCode, () => {
	handleTypeCodeChange()
})
</script>

<template>
	<el-popover :visible="popoverOpenState" width="450px">
		<template #reference>
			<div @click="popoverOpenState = !popoverOpenState">
				<el-input readonly :model-value="modelValue.rawType">
					<template v-if="modelValue.enum != undefined" #prefix>
						【{{ modelValue.enum.name }}】
					</template>
				</el-input>
			</div>
		</template>

		<el-form v-if="jdbcTypeStore.isLoaded && columnDefaultStore.isLoaded">
			<el-form-item label="jdbc 类型">
				<el-select
					v-model="modelValue.typeCode"
					filterable
					style="width: 100%">
					<el-option v-for="type in jdbcTypeStore.list"
							   :label="type.type" :value="type.typeCode"></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="生成 DDL 时以字面类型覆盖 jdbc 类型">
				<el-switch v-model="modelValue.overwriteByRaw"></el-switch>
			</el-form-item>

			<el-form-item label="字面类型">
				<el-input v-model="modelValue.rawType" :disabled="!modelValue.overwriteByRaw"></el-input>
			</el-form-item>

			<el-form-item label="长度精度">
				<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
					<span>(</span>
					<span><el-input-number v-model="modelValue.displaySize" controls-position="right"></el-input-number></span>
					<span style="padding-left: 0.3em;">,</span>
					<span><el-input-number v-model="modelValue.numericPrecision" controls-position="right"></el-input-number></span>
					<span style="padding-left: 0.3em;">)</span>
				</el-text>
			</el-form-item>

			<el-form-item label="映射枚举">
				<el-select :model-value="modelValue.enum?.name" clearable filterable
						   @clear="modelValue.enum = undefined"
						   @change="(name: string) => {modelValue.enum = { name: name }}">
					<el-option v-for="enumName in enumNames" :value="enumName"></el-option>
				</el-select>

				<el-button v-if="modelValue.enum" :icon="EditPen" @click="emits('editEnum', modelValue.enum!.name)"></el-button>
				<el-button v-else :icon="Plus" @click="emits('createEnum')"></el-button>
			</el-form-item>

			<div style="text-align: right;">
				<el-button @click="popoverOpenState = false">关闭</el-button>
			</div>
		</el-form>
	</el-popover>
</template>
