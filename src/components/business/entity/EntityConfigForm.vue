<script setup lang="ts">
import {
    GenEntityConfigWithNewPropertiesInput,
    GenEntityDetailView, type GenPropertyEntityConfigInput
} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {cloneDeep} from "lodash";
import {watch, ref, DeepReadonly} from "vue";
import EntityBusinessSelect from "@/components/business/entity/EntityBusinessSelect.vue";
import PropertyBusinessSelect from "@/components/business/entity/PropertyBusinessSelect.vue";
import {getDefaultProperty} from "@/components/business/entity/defaultProperty.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {sendI18nMessage} from "@/message/message.ts";

const props = defineProps<{
	entity: GenEntityDetailView,

    validate: (genEnum: DeepReadonly<GenEntityConfigWithNewPropertiesInput>) => MainLocaleKeyParam[],
}>()

const entity = ref<GenEntityDetailView>(
	cloneDeep(props.entity)
)

const properties = ref<GenPropertyEntityConfigInput[]>([])

watch(() => props.entity, (value) => {
	entity.value = cloneDeep(value)
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
		<el-input v-model="entity.name"/>
		<el-switch v-model="entity.overwriteName"/>
		<el-input v-model="entity.comment"/>
		<el-switch v-model="entity.overwriteComment"/>
		<el-input v-model="entity.remark"/>
		<EntityBusinessSelect v-model="entity"/>

		<div v-for="property in entity.properties">
			<el-input v-model="property.name"/>
			<el-switch v-model="property.overwriteName"/>
			<el-input v-model="property.comment"/>
			<el-switch v-model="property.overwriteComment"/>
			<el-input v-model="property.remark"/>
			<el-text>{{ property.type }}</el-text>
			<el-checkbox disabled v-model="property.type"/>
			<PropertyBusinessSelect v-model="property"/>
		</div>

		<div v-for="property in properties">
			<el-input v-model="property.name"/>
			<el-switch v-model="property.overwriteName"/>
			<el-input v-model="property.comment"/>
			<el-switch v-model="property.overwriteComment"/>
			<el-input v-model="property.remark"/>
			<el-input v-model="property.type"/>
			<el-checkbox v-model="property.typeNotNull"/>
		</div>
		<el-button @click="handleAddManalProperty"></el-button>

		<el-button @click="handleSubmit"/>
	</el-form>
</template>
