<script setup lang="ts">
import {ModelValueProps} from "@/components/global/dialog/DragDialogProps.ts";
import {GenModelInput_TargetOf_enums, GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";
import {ModelValueEmits} from "@/components/global/dialog/DragDialogEmits.ts";
import {ref, watch} from "vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import {useJdbcTypeStore} from "@/components/business/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {containsClassList, interactionTagClassList, judgeTarget} from "@/utils/clickUtils.ts";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {useZIndex} from "element-plus";

const jdbcTypeStore = useJdbcTypeStore()

const columnDefaultStore = useColumnDefaultStore()

const props = defineProps<
	ModelValueProps<GenTableModelInput_TargetOf_columns> &
	{ getEnums: () => Array<GenModelInput_TargetOf_enums> }
>()

const emits = defineEmits<
	ModelValueEmits<GenTableModelInput_TargetOf_columns> &
	{
		(event: "editEnum", name: string): void,
		(event: "createEnum"): void,
	}
>()

const popoverOpenState = ref(false)

const zIndexManager = useZIndex()
const currentZIndex = ref<number>()
watch(() => popoverOpenState.value, (value) => {
	if (value) {
		if (currentZIndex.value == undefined || currentZIndex.value <= zIndexManager.currentZIndex.value) {
			currentZIndex.value = zIndexManager.nextZIndex()
		}
	}
})

const getEnumsNames = () => {
	return props.getEnums().map(it => it.name)
}

const enumNames = ref<string[]>(getEnumsNames())
const syncEnumNames = () => {
	enumNames.value = getEnumsNames()
}

const handleTypeCodeChange = () => {
	const typeCode = props.modelValue.typeCode

	const columnDefaults = columnDefaultStore.get(typeCode)

	if (columnDefaults.length === 1) {
		const columnDefault = columnDefaults[0]

		props.modelValue.overwriteByRaw = true
		props.modelValue.rawType = columnDefault.rawType
		props.modelValue.dataSize = columnDefault.dataSize
		props.modelValue.numericPrecision = columnDefault.numericPrecision
		if (columnDefault.defaultValue) props.modelValue.defaultValue = columnDefault.defaultValue
	} else {
		const type = jdbcTypeStore.jdbcTypeMap.get(typeCode)
		if (type) {
			props.modelValue.rawType = type
		}
		props.modelValue.overwriteByRaw = false
		props.modelValue.dataSize = 0
		props.modelValue.numericPrecision = 0
	}
}

watch(() => props.modelValue.typeCode, () => {
	handleTypeCodeChange()
})

const wrapper = ref()

useClickOutside(() => wrapper.value, (e) => {
	if (!popoverOpenState.value) return
	if (!judgeTarget(e, (el) => {
		if ('contenteditable' in el) {
			return true
		}
		if (interactionTagClassList.includes(el.tagName)) {
			return true
		}
		if (containsClassList(el, [...interactionTagClassList, 'column-type-form-input'])) {
			return true
		}
	})) {
		popoverOpenState.value = false
	}
})
</script>

<template>
	<div class="column-type-form">
		<div @click="popoverOpenState = !popoverOpenState" class="column-type-form-input">
			<el-input readonly :model-value="modelValue.rawType">
				<template v-if="modelValue.enum !== undefined" #prefix>
					【{{ modelValue.enum.name }}】
				</template>
			</el-input>
		</div>

		<div ref="wrapper" class="column-type-form-wrapper" v-show="popoverOpenState"
			 :style="`z-index: ${currentZIndex};`">
			<el-form v-if="jdbcTypeStore.isLoaded && columnDefaultStore.isLoaded">
				<el-form-item label="jdbc 类型">
					<el-select
						v-model="modelValue.typeCode"
						filterable
						style="width: 100%">
						<el-option v-for="type in jdbcTypeStore.jdbcTypeList"
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
						<span><el-input-number v-model="modelValue.dataSize"
											   controls-position="right"></el-input-number></span>
						<span style="padding-left: 0.3em;">,</span>
						<span><el-input-number v-model="modelValue.numericPrecision"
											   controls-position="right"></el-input-number></span>
						<span style="padding-left: 0.3em;">)</span>
					</el-text>
				</el-form-item>

				<el-form-item label="映射枚举">
					<Line style="width: 100%;">
						<LineItem span="3em">
							<el-button v-if="modelValue.enum" :icon="EditPen"
									   @click="emits('editEnum', modelValue.enum!.name)"></el-button>
							<el-button v-else :icon="Plus" @click="emits('createEnum')"></el-button>
						</LineItem>
						<LineItem>
							<el-select :model-value="modelValue.enum?.name" clearable filterable
									   @clear="modelValue.enum = undefined"
									   @change="(name: string) => {modelValue.enum = { name: name }}"
									   @focus="syncEnumNames">
								<el-option v-for="enumName in enumNames" :value="enumName"></el-option>
							</el-select>
						</LineItem>
					</Line>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<style scoped>
.column-type-form {
	position: relative;
}

.column-type-form-wrapper {
	position: absolute;
	top: 2em;
	padding: 20px 10px 10px;
	background-color: #fff;
	border-radius: var(--el-border-radius-base);
	box-shadow: var(--el-box-shadow);
}
</style>
