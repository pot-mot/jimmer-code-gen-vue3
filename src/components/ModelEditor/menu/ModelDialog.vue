<script setup lang="ts">
import {ref} from "vue";
import {GenModelInput} from "../../../api/__generated/model/static";

const defaultValue: GenModelInput = {
	name: "",
	remark: "",
}

const model = ref<GenModelInput>({...defaultValue})

interface ModelDialogEvent {
	(event: "submit", model: GenModelInput): void,
	(event: "close"): void,
}

const emits = defineEmits<ModelDialogEvent>()
</script>

<template>
	<el-dialog :model-value="true" @close="emits('close')">
		<el-text>模型</el-text>
		<el-input v-model="model.name"></el-input>
		<el-input v-model="model.remark" type="textarea"></el-input>

		<el-button @click="emits('close')">取消</el-button>
		<el-button @click="emits('submit', model)">确定</el-button>
	</el-dialog>
</template>

<style scoped>

</style>