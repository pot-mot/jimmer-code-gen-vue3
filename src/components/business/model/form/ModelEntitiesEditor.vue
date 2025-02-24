<script setup lang="ts">
import {ref} from "vue"
import {EntityConfigInput, EntityConfigView} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import Details from "@/components/global/common/Details.vue";
import EntityForm from "@/components/business/entity/EntityForm.vue";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";
import {validateEntity} from "@/components/business/entity/validateEntity.ts";
import {EntityFormExpose} from "@/components/business/entity/EntityFormExpose.ts";

const i18nStore = useI18nStore()

const entities = defineModel<EntityConfigView[]>({
	required: true
})

const emits = defineEmits<FormEmits<EntityConfigInput[], EntityConfigView[]>>()

const entityFormRefs = ref<EntityFormExpose[]>([])

const validate = async (
	entity: DeepReadonly<EntityConfigInput>,
): Promise<MainLocaleKeyParam[]> => {
	const otherEntities = entities.value.filter(it => {
		return it.tableConvertedEntity.id !== entity.tableConvertedEntity.id
	})

	return validateEntity(
		entity,
		otherEntities
	)
}

const handleSubmit = async () => {
	const inputs: EntityConfigInput[] = []

	for (const el of entityFormRefs.value) {
		const validateResult = await el.validate()
		if (validateResult) {
			inputs.push(el.getInput())
		} else {
			return
		}
	}

	emits('submit', inputs)
}

const handleCancel = () => {
	emits('cancel', entities.value)
}
</script>

<template>
	<el-form>
		<Details v-for="(entity, index) in entities">
			<template #title>
				{{ entity.tableConvertedEntity.name }}
			</template>

			<EntityForm
				ref="entityFormRefs"
				v-model="entities[index]"
				:validate="validate"
				:with-operations="false"
			/>
		</Details>

		<div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
			<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
			<el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
		</div>
	</el-form>
</template>
