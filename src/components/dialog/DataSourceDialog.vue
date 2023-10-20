<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import {api} from "../../api";
import {GenDataSourceInput, GenDataSourceView} from "../../api/__generated/model/static";
import {DataSourceType} from "../../api/__generated/model/enums";
import DragDialog from "../common/DragDialog.vue";
import {sendMessage} from "../../utils/message.ts";
import {ElForm, ElFormItem, ElSelect, ElOption} from "element-plus";

const dataSourceTypes = ref<DataSourceType[]>([])

onMounted(async () => {
	dataSourceTypes.value = await api.dataSourceService.listType()
})

interface DataSourceDialogProps {
	id?: number,
	dataSource: Partial<GenDataSourceInput>,
	x?: number
	y?: number
}

const props = defineProps<DataSourceDialogProps>()

interface SchemaItemEmits {
	(event: "added", dataSource: GenDataSourceView): void

	(event: "updated"): void

	(event: "close"): void
}


const dataSource = ref<GenDataSourceInput>({
	name: "",
	host: "127.0.0.1",
	port: "3306",
	urlSuffix: "",
	orderKey: 0,
	username: "",
	password: "",
	remark: "",
	type: "MySQL"
})

watch(() => dataSource.value.type, async (newValue) => {
	if (!props.id) {
		const defaultDataSource = await api.dataSourceService.getDefaultDataSource({dataSourceType: newValue})
		Object.assign(dataSource.value, {...defaultDataSource})
	}
}, {immediate: true})

watch(() => props.dataSource, () => {
	Object.assign(dataSource.value, {...props.dataSource})
}, {immediate: true})

const emits = defineEmits<SchemaItemEmits>()

const test = () => {
	api.dataSourceService.test({
		body: dataSource.value
	}).then(res => {
		if (res) {
			sendMessage("数据源测试成功", "success")
		} else {
			sendMessage("数据源测试失败", "error")
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
				emits("updated")
			}
		})
	} else {
		api.dataSourceService.insert({
			body: dataSource.value
		}).then(id => {
			api.dataSourceService.get({id}).then(res => {
				if (!!res) {
					emits("added", res)
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
	<DragDialog :x="props.x" :y="props.y" :init-w="500" @close="close">
		<el-form label-position="left" label-width="6em" size="small">
			<el-form-item label="name">
				<el-input v-model="dataSource.name"></el-input>
			</el-form-item>
			<el-form-item label="url">
				<el-col :span="9">
					<el-select v-model="dataSource.type" filterable class="cling-right" name="type">
						<template #prefix>jdbc:</template>
						<el-option v-for="(type) in dataSourceTypes" :value="type"
								   :label="type.toLowerCase()"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-input v-model="dataSource.host" class="cling-left cling-right" name="host">
						<template #prefix>://</template>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-input v-model="dataSource.port" class="cling-left cling-right" name="port">
						<template #prefix>:</template>
					</el-input>
				</el-col>
				<el-col :span="5">
					<el-input v-model="dataSource.urlSuffix" class="cling-left" name="urlSuffix">
						<template #prefix>&nbsp</template>
					</el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="username">
				<el-input v-model="dataSource.username"></el-input>
			</el-form-item>
			<el-form-item label="password">
				<el-input v-model="dataSource.password" show-password></el-input>
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