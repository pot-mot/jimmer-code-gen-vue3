<script setup lang="ts">
import {
	GenEntityConfigWithNewPropertiesInput,
	GenEntityDetailView,
	type GenEntityDetailView_TargetOf_properties,
	type GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {DeepReadonly, ref, watch} from "vue";
import EntityBusinessSelect from "@/components/business/entity/EntityBusinessSelect.vue";
import EntityDtoPropertiesSelect from "@/components/business/entity/EntityDtoPropertiesSelect.vue";
import {getDefaultProperty} from "@/components/business/entity/defaultProperty.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {sendI18nMessage} from "@/message/message.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import {Plus} from "@element-plus/icons-vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

const i18nStore = useI18nStore()

const props = defineProps<{
	entity: GenEntityDetailView,

	validate: (genEnum: DeepReadonly<GenEntityConfigWithNewPropertiesInput>) => MainLocaleKeyParam[],
}>()

const extractEntityData = (entity: DeepReadonly<GenEntityDetailView>) => {
	const value = cloneDeepReadonly<GenEntityDetailView>(entity)

	const columnProperties: Array<GenEntityDetailView_TargetOf_properties> = []
	const noColumnProperties: Array<GenEntityDetailView_TargetOf_properties> = []

	value.properties.forEach((it) => {
		if (it.columnId === undefined) {
			noColumnProperties.push(it)
		} else {
			columnProperties.push(it)
		}
	})

	return {
		entityData: {
			...value,
			properties: columnProperties
		},
		propertiesData: noColumnProperties
	}
}

const {
	entityData, propertiesData
} = extractEntityData(props.entity)

const entity = ref<GenEntityDetailView>(entityData)

const properties = ref<GenPropertyEntityConfigInput[]>(propertiesData)

watch(() => props.entity, (value) => {
	const {
		entityData, propertiesData
	} = extractEntityData(value)

	entity.value = entityData
	properties.value = propertiesData
})

const emits = defineEmits<FormEmits<
	GenEntityConfigWithNewPropertiesInput,
	GenEntityDetailView
>>()

const handleSubmit = () => {
	const entityWithProperties: GenEntityConfigWithNewPropertiesInput = {
		entity: entity.value,
		properties: properties.value
	}

	const messageList = props.validate(entityWithProperties)

	if (messageList.length > 0) {
		messageList.forEach(it => sendI18nMessage(it, 'warning'))
		return
	}

	emits('submit', entityWithProperties)
}

const handleAddManalProperty = () => {
	properties.value.push(getDefaultProperty())
}
</script>

<template>
	<el-form style="width: calc(100% - 0.5rem);">
		<el-row :gutter="12" style="line-height: 2em; padding-left: 1em; padding-bottom: 1em;">
			<el-col :span="12">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_name')">
					<el-input v-model="entity.name" :disabled="!entity.overwriteName"/>
					<el-checkbox v-model="entity.overwriteName"/>
				</el-form-item>
			</el-col>

			<el-col :span="12">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_comment')">
					<el-input v-model="entity.comment" :disabled="!entity.overwriteComment"/>
					<el-checkbox v-model="entity.overwriteComment"/>
				</el-form-item>
			</el-col>

			<el-col :span="24">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_remark')">
					<el-input type="textarea" v-model="entity.remark"/>
				</el-form-item>
			</el-col>

			<el-col :span="24">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_business')">
					<EntityBusinessSelect v-model="entity"/>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row v-for="property in entity.properties" :key="property.id" :gutter="12">
			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_name')">
					<el-input v-model="property.name" :disabled="!property.overwriteName"/>
					<el-checkbox v-model="property.overwriteName"/>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
					<el-input v-model="property.comment" :disabled="!property.overwriteComment"/>
					<el-checkbox v-model="property.overwriteComment"/>
				</el-form-item>
			</el-col>

			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
					<el-text>{{ property.type }}</el-text>
					<el-checkbox disabled v-model="property.typeNotNull"/>
				</el-form-item>
			</el-col>

			<el-col :span="24">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_remark')">
					<el-input v-model="property.remark"/>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row v-for="property in properties" :gutter="12">
			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_name')">
					<el-input v-model="property.name"/>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_comment')">
					<el-input v-model="property.comment"/>
				</el-form-item>
			</el-col>

			<el-col :span="8">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_type')">
					<el-input v-model="property.type"/>
					<el-checkbox v-model="property.typeNotNull"/>
				</el-form-item>
			</el-col>

			<el-col :span="24">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_remark')">
					<el-input v-model="property.remark"/>
				</el-form-item>
			</el-col>

			<el-col :span="24">
				<el-form-item :label="i18nStore.translate('LABEL_EntityConfigForm_property_body')">

				</el-form-item>
			</el-col>
		</el-row>

		<el-button @click="handleAddManalProperty" :icon="Plus"/>

		<EntityDtoPropertiesSelect
			v-model:entity="entity"
			v-model:properties="properties"
		/>

		<el-button @click="handleSubmit">
			{{ i18nStore.translate('BUTTON_submit') }}
		</el-button>
	</el-form>
</template>
