<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenModelInput} from "@/api/__generated/model/static";

const defaultValue: GenModelInput = {
	name: "",
	remark: "",
	value: "",
}

const model = ref<GenModelInput>({...defaultValue})

interface ModelDialogProps {
	model?: GenModelInput,
}

const props = defineProps<ModelDialogProps>()

watch(() => props.model, (value) => {
	if (value) {
		model.value = {
			...model.value,
			...value,
		}
	}
}, {immediate: true})

interface ModelDialogEvent {
	(event: "submit", model: GenModelInput): void,

	(event: "cancel"): void,
}

const emits = defineEmits<ModelDialogEvent>()

const handleCancel = () => {
	emits('cancel')
}

const handleSubmit = () => {
	emits('submit', model.value)
}
</script>

<template>
	<el-dialog :model-value="true" style="padding: 0;" title="模型" @close="handleCancel">
		<el-form size="default">
			<el-form-item label="名称">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="model.remark" type="textarea"></el-input>
			</el-form-item>

			<div style="text-align: right;">
				<el-button type="info" @click="handleCancel">取消</el-button>
				<el-button type="warning" @click="handleSubmit">提交</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>

<style scoped>

</style>