<script setup lang="ts">
import {ref, watch} from "vue";
import {GenModelInput} from "../../../api/__generated/model/static";

const defaultValue: GenModelInput = {
	name: "",
	remark: "",
}

const model = ref<GenModelInput>({...defaultValue})

interface ModelDialogProps {
	model?: GenModelInput
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
	<el-dialog :model-value="true" title="模型" @close="handleCancel">
		<el-input v-model="model.name"></el-input>
		<el-input v-model="model.remark" type="textarea"></el-input>

		<div style="text-align: right;">
			<el-button @click="handleCancel" type="info">取消</el-button>
			<el-button @click="handleSubmit" type="warning">提交</el-button>
		</div>
	</el-dialog>
</template>

<style scoped>

</style>