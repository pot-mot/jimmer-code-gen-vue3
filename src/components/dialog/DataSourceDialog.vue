<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {api} from "../../api";
import {GenDataSourceInput, GenDataSourceView} from "../../api/__generated/model/static";
import {DataSourceType} from "../../api/__generated/model/enums";
import DragDialog from "../common/DragDialog.vue";
import {sendMessage} from "../../utils/message.ts";
import {ElForm, ElFormItem} from "element-plus";

const dataSourceTypes = ref<DataSourceType[]>([])

onMounted(() => {
	api.dataSourceService.listTypes().then(res => {
		dataSourceTypes.value = res
	})
})

interface DataSourceDialogProps {
	id?: number,
	dataSource: Partial<GenDataSourceInput>,
	x?: number
	y?: number
}

const props = defineProps<DataSourceDialogProps>()

interface SchemaItemEmits {
	(event: "save", dataSource: GenDataSourceView): void

	(event: "edit"): void

	(event: "close"): void
}

const defaultDataSource: GenDataSourceInput = {
	name: "",
	host: "127.0.0.1",
	port: "3306",
	orderKey: 0,
	username: "",
	password: "",
	remark: "",
	type: "MySQL"
}

const dataSource = ref<GenDataSourceInput>({
	...defaultDataSource
})

watch(() => props.dataSource, () => {
	Object.assign(dataSource.value, {...props.dataSource})
}, {immediate: true})

const emits = defineEmits<SchemaItemEmits>()

const test = () => {
	api.dataSourceService.test({
		body: dataSource.value
	}).then(res => {
		if (res) {
			sendMessage("数据源测试成功", "Success")
		} else {
			sendMessage("数据源测试失败", "Warning")
		}
	})
}

const submit = () => {
	if (props.id) {
		api.dataSourceService.edit({
			id: props.id,
			body: dataSource.value
		}).then(id => {
			if (id == props.id) {
				emits("edit")
			}
		})
	} else {
		api.dataSourceService.insert({
			body: dataSource.value
		}).then(id => {
			api.dataSourceService.get({id}).then(res => {
				if (res.length > 0) {
					emits("save", res[0])
				}
			})
		})
	}
}

const close = () => {
	emits("close")
}
</script>

<template>
	<DragDialog :x="props.x" :y="props.y" @close="close">
		<el-form label-position="left" label-width="6em">
			<el-form-item label="name">
				<el-input v-model="dataSource.name"></el-input>
			</el-form-item>
			<el-form-item label="host">
				<el-input v-model="dataSource.host"></el-input>
			</el-form-item>
			<el-form-item label="port">
				<el-input v-model="dataSource.port"></el-input>
			</el-form-item>
			<el-form-item label="username">
				<el-input v-model="dataSource.username"></el-input>
			</el-form-item>
			<el-form-item label="password">
				<el-input v-model="dataSource.password" show-password></el-input>
			</el-form-item>
			<el-form-item label="type">
				<el-select v-model="dataSource.type">
					<el-option v-for="(type) in dataSourceTypes" :value="type">{{ type }}</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="remark">
				<el-input type="textarea" v-model="dataSource.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="test" type="info">测试</el-button>
				<el-button @click="submit" type="warning">提交</el-button>
			</el-form-item>
		</el-form>
	</DragDialog>
</template>