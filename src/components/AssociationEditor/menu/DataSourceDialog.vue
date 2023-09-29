<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {api} from "../../../api";
import {GenDataSourceInput, GenDataSourceView} from "../../../api/__generated/model/static";
import {DataSourceType} from "../../../api/__generated/model/enums";
import DragDialog from "../../common/DragDialog.vue";

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
	type: "MYSQL"
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
			alert("测试成功")
		} else {
			alert("测试失败")
		}
	})
}

const submit = () => {
	if (props.id) {
		api.dataSourceService.edit({
			id: props.id,
			body: dataSource.value
		}).then(count => {
			if (count > 0) {
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
		<table style="width: 100%;">
			<tr>
				<td><label>name</label></td>
				<td><input v-model="dataSource.name"></td>
			</tr>
			<tr>
				<td><label>host</label></td>
				<td><input v-model="dataSource.host"></td>
			</tr>
			<tr>
				<td><label>port</label></td>
				<td><input v-model="dataSource.port"></td>
			</tr>
			<tr>
				<td><label>username</label></td>
				<td><input v-model="dataSource.username"></td>
			</tr>
			<tr>
				<td><label>password</label></td>
				<td><input v-model="dataSource.password" type="password"></td>
			</tr>
			<tr>
				<td><label>type</label></td>
				<select v-model="dataSource.type">
					<option v-for="(type) in dataSourceTypes" :value="type">{{ type }}</option>
				</select>
			</tr>
			<tr>
				<td><label>remark</label></td>
				<td><textarea v-model="dataSource.remark"></textarea></td>
			</tr>
		</table>
		<button @click="test">测试</button>
		<button @click="submit">提交</button>
	</DragDialog>
</template>