<script setup lang="ts">
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import {EditPen, Plus} from "@element-plus/icons-vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";
import {useColumnDefaultStore} from "@/components/business/columnDefault/ColumnDefaultStore.ts";
import {useClickOutside} from "@/components/global/list/useClickOutside.ts";
import {containsClassList, interactionTagClassList, judgeTarget} from "@/utils/clickUtils.ts";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {useZIndex} from "element-plus";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const {MODEL} = useModelEditorStore()

const jdbcTypeStore = useJdbcTypeStore()

const columnDefaultStore = useColumnDefaultStore()

const column = defineModel<GenTableModelInput_TargetOf_columns>()

const emits = defineEmits<{
	(event: "editEnum", name: string): void,
	(event: "createEnum"): void,
}>()

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
	return MODEL.enums.map(it => it.name)
}

const enumNames = ref<string[]>(getEnumsNames())
const syncEnumNames = () => {
	enumNames.value = getEnumsNames()
}

const handleTypeCodeChange = () => {
	if (!column.value) return

	const typeCode = column.value.typeCode

	const columnDefaults = columnDefaultStore.get(typeCode)

	if (columnDefaults.length === 1) {
		const columnDefault = columnDefaults[0]

		column.value.overwriteByRaw = true
		column.value.rawType = columnDefault.rawType
		column.value.dataSize = columnDefault.dataSize
		column.value.numericPrecision = columnDefault.numericPrecision
		if (columnDefault.defaultValue) column.value.defaultValue = columnDefault.defaultValue
	} else {
		const type = jdbcTypeStore.jdbcTypeMap.get(typeCode)
		if (type) {
			column.value.rawType = type
		}
		column.value.overwriteByRaw = false
		column.value.dataSize = 0
		column.value.numericPrecision = 0
	}
}

watch(() => column.value?.typeCode, () => {
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
	<div class="column-type-form" v-if="column">
		<div @click="popoverOpenState = !popoverOpenState" class="column-type-form-input">
			<el-input readonly :model-value="column.rawType">
				<template v-if="column.enum !== undefined" #prefix>
					【{{ column.enum.name }}】
				</template>
			</el-input>
		</div>

		<div ref="wrapper" class="column-type-form-wrapper" v-show="popoverOpenState"
			 :style="`z-index: ${currentZIndex};`">
			<el-form v-if="jdbcTypeStore.isLoaded && columnDefaultStore.isLoaded">
				<el-form-item label="jdbc 类型">
					<el-select
						v-model="column.typeCode"
						filterable
						style="width: 100%">
						<el-option v-for="type in jdbcTypeStore.jdbcTypeList"
								   :label="type.type" :value="type.typeCode"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="生成 DDL 时以字面类型覆盖 jdbc 类型">
					<el-switch v-model="column.overwriteByRaw"></el-switch>
				</el-form-item>

				<el-form-item label="字面类型">
					<el-input v-model="column.rawType" :disabled="!column.overwriteByRaw"></el-input>
				</el-form-item>

				<el-form-item label="长度精度">
					<el-text style="display: grid; grid-template-columns: 0.5em 1fr 1em 1fr 0.5em">
						<span>(</span>
						<span><el-input-number v-model="column.dataSize"
											   controls-position="right"></el-input-number></span>
						<span style="padding-left: 0.3em;">,</span>
						<span><el-input-number v-model="column.numericPrecision"
											   controls-position="right"></el-input-number></span>
						<span style="padding-left: 0.3em;">)</span>
					</el-text>
				</el-form-item>

				<el-form-item label="映射枚举">
					<Line style="width: 100%;">
						<LineItem span="3em">
							<el-button v-if="column.enum" :icon="EditPen"
									   @click="emits('editEnum', column.enum!.name)"></el-button>
							<el-button v-else :icon="Plus" @click="emits('createEnum')"></el-button>
						</LineItem>
						<LineItem>
							<el-select :model-value="column.enum?.name" clearable filterable
									   @clear="() => {
                                           if (column) column.enum = undefined
									   }"
									   @change="(name: string) => {
                                           if (column) column.enum = { name: name }
                                       }"
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
