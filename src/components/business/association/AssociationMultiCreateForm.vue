<script setup lang="ts">
import {
	GenAssociationModelInput,
	GenTableModelInput,
	type GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {AssociationType_CONSTANTS, DissociateAction_CONSTANTS} from "@/api/__generated/model/enums";
import {computed, DeepReadonly, ref} from "vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {
	AssociationMultiCreateInput,
	AssociationMultiCreateInputModelValue,
	createAssociationMultiCreateInput,
	extractMultiCreateInput
} from "@/components/business/association/AssociationMultiCreateInput.ts";
import {getColumnCombineKey} from "@/components/business/association/columnEquals.ts";

const i18nStore = useI18nStore()

const {MODEL} = useModelEditorStore()

interface AssociationMultiCreateFormProps {
	validate: (association: DeepReadonly<Array<GenAssociationModelInput>>) => MainLocaleKeyParam[],

	createAssociationName: (
		association: DeepReadonly<GenAssociationModelInput>,
		sourceTableIsSuper: boolean,
		targetTableIsSuper: boolean,
	) => string
}

const props = defineProps<AssociationMultiCreateFormProps>()

const association = ref<AssociationMultiCreateInputModelValue>(createAssociationMultiCreateInput())

const emits = defineEmits<FormEmits<GenAssociationModelInput[], AssociationMultiCreateInputModelValue>>()

const sourceTableOptions = computed<Array<GenTableModelInput>>(() => {
	return MODEL.tables
})

const sourceColumnOptions = computed<GenTableModelInput_TargetOf_columns[]>(() => {
	let tables = association.value.sourceTables
	if (tables.length === 0) {
		tables = MODEL.tables
	}
	const columns = tables.flatMap(it => it.columns)

	const columnCountMap = new Map<string, GenTableModelInput_TargetOf_columns[]>

	for (const column of columns) {
		const key = getColumnCombineKey(column)
		const currentValue = columnCountMap.get(key)
		if (currentValue !== undefined) {
			currentValue.push(column)
		} else {
			columnCountMap.set(key, [column])
		}
	}

	return [...columnCountMap.values()].filter(it => it.length === tables.length).map(it => it[0])
})

const targetTableOptions = computed<Array<GenTableModelInput>>(() => {
	return MODEL.tables
})

const targetColumnOptions = computed(() => {
	return association.value.targetTable?.columns ?? []
})

const sourceTableIndexes = computed<number[]>({
	get() {
		const result: number[] = []
		for (let index = 0; index < sourceTableOptions.value.length; index++) {
			if (association.value.sourceTables.includes(sourceTableOptions.value[index])) {
				result.push(index)
			}
		}
		return result
	},
	set(indexes: number[]) {
		const sourceTables: GenTableModelInput[] = []
		for (const index of indexes) {
			sourceTables.push(sourceTableOptions.value[index])
		}
		association.value.sourceTables = sourceTables
	},
})

const targetTableIndex = computed<number | undefined>({
	get() {
		if (association.value.targetTable === undefined)
			return undefined

		for (let index = 0; index < targetTableOptions.value.length; index++) {
			if (targetTableOptions.value[index].name === association.value.targetTable.name) {
				return index
			}
		}
		return undefined
	},
	set(index: number | undefined) {
		if (index !== undefined) {
			association.value.targetTable = targetTableOptions.value[index]
		} else {
			association.value.targetTable = undefined
		}
	},
})

const handleCleanDissociateAction = () => {
	association.value.dissociateAction = undefined
}

const handleSubmit = async () => {
	if (association.value.sourceTables.length === 0) {
		sendI18nMessage('VALIDATE_GenAssociation_sourceTable_notFound')
		return
	}

	if (association.value.targetTable === undefined) {
		sendI18nMessage('VALIDATE_GenAssociation_targetTable_notFound')
		return
	}

	const associations = extractMultiCreateInput(association.value as AssociationMultiCreateInput)

	const messageList = props.validate(associations)

	if (messageList.length > 0) {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return
	}

	emits('submit', associations)
}

const handleCancel = () => {
	emits('cancel', association.value)
}
</script>

<template>
	<el-form style="width: calc(100% - 0.5rem);">
		<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_mappingAssociation')">
			<table style="width: 100%;">
				<tr v-for="columnReference in association.columnReferences">
					<td style="display: grid; grid-template-columns: 3fr 1fr 2em 1fr 1fr;">
						<el-select
							v-model="sourceTableIndexes" clearable filterable multiple
							:placeholder="i18nStore.translate('LABEL_AssociationForm_sourceTableName_placeholder')"
							collapse-tags collapse-tags-tooltip :max-collapse-tags="3"
							@clear="association.sourceTables = []"
						>
							<el-option
								v-for="(sourceTable, index) in sourceTableOptions"
								:key="sourceTable.name" :value="index" :label="sourceTable.name"
							/>
							<template #label="{ value }">
								<el-text>{{ sourceTableOptions[value].name }}</el-text>
							</template>
						</el-select>
						<el-select
							v-model="columnReference.sourceColumnName" clearable filterable
							:placeholder="i18nStore.translate('LABEL_AssociationForm_sourceColumnName_placeholder')"
						>
							<el-option
								v-for="column in sourceColumnOptions"
								:key="column.name"
								:value="column.name"
							/>
						</el-select>
						<el-text>
							{{ " -> " }}
						</el-text>
						<el-select v-model="targetTableIndex" clearable filterable
								   :placeholder="i18nStore.translate('LABEL_AssociationForm_targetTableName_placeholder')">
							<el-option v-for="(targetTable, index) in targetTableOptions"
									   :key="targetTable.name" :value="index" :label="targetTable.name"/>
							<template #label>
								<el-text>{{ association.targetTable?.name }}</el-text>
							</template>
						</el-select>
						<el-select v-model="columnReference.targetColumnName" clearable filterable
								   :placeholder="i18nStore.translate('LABEL_AssociationForm_targetColumnName_placeholder')">
							<el-option v-for="column in targetColumnOptions"
									   :key="column.name"
									   :value="column.name"
							/>
						</el-select>
					</td>
				</tr>
			</table>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_type')">
			<el-select v-model="association.type">
				<el-option v-for="associationType in AssociationType_CONSTANTS" :value="associationType"/>
			</el-select>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_fake')">
			<el-switch v-model="association.fake"/>
		</el-form-item>

		<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_dissociateAction')">
			<el-select v-model="association.dissociateAction"
					   clearable @clear="handleCleanDissociateAction">
				<el-option v-for="dissociateAction in DissociateAction_CONSTANTS" :value="dissociateAction"/>
			</el-select>
		</el-form-item>

		<el-row :gutter="24">
			<el-col :span="12">
				<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_updateAction')">
					<el-input v-model="association.updateAction"
							  :disabled="association.type === 'MANY_TO_MANY'"/>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item :label="i18nStore.translate('LABEL_AssociationForm_deleteAction')">
					<el-input v-model="association.deleteAction"
							  :disabled="association.type === 'MANY_TO_MANY'"/>
				</el-form-item>
			</el-col>
		</el-row>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
			<el-button type="warning" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
		</div>
	</el-form>
</template>

