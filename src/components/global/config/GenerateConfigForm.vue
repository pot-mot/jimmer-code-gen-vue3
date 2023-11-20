<script lang="ts" setup>
import {api} from "@/api";
import {onMounted, ref} from "vue";
import {GenConfig, GenConfigProperties} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import DataSourceIcon from "../icons/database/DataSourceIcon.vue";
import Details from "../common/Details.vue";
import {useLoading} from "../../../hooks/useLoading.ts";
import {dataSourceTypes, languages} from "../../../constant/enums.ts";

const config = ref<GenConfig>()

const generateConfigLoading = useLoading()

const getData = async () => {
	generateConfigLoading.start()

	config.value = await api.configService.getConfig()

	generateConfigLoading.end()
}

onMounted(() => {
	getData()
})

interface GenerateConfigFormEmits {
	(event: "submit"): void

	(event: "cancel"): void
}

const emits = defineEmits<GenerateConfigFormEmits>()

const handleSubmit = async () => {
	await api.configService.setConfig({body: <GenConfigProperties>(config.value)})
	sendMessage('配置修改成功', 'success')
	emits('submit')
}

const handleCancel = () => {
	emits('cancel')
}
</script>

<template>
	<div v-loading="generateConfigLoading.isLoading()">
		<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">全局生成配置</h3>

		<el-form v-if="config" size="default">
			<el-row :gutter="24">
				<el-col :span="8">
					<el-form-item label="作者">
						<el-input v-model="config.author"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="数据源类型">
						<el-select v-model="config.dataSourceType">
							<template #prefix>
								<DataSourceIcon :type="config.dataSourceType"></DataSourceIcon>
							</template>
							<el-option v-for="dataSourceType in dataSourceTypes" :label="dataSourceType"
									   :value="dataSourceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="语言">
						<el-select v-model="config.language">
							<el-option v-for="language in languages" :label="language" :value="language"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="24">
				<el-col :span="6">
					<el-form-item label="分隔符">
						<el-input v-model="config.separator"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="生成 ddl 时携带外键">
						<el-switch v-model="config.tableDefineWithFk"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="默认包路径">
						<el-input v-model="config.defaultPackagePath"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="逻辑删除注释">
						<el-input v-model="config.logicalDeletedAnnotation"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="24">
				<el-col :span="8">
					<el-form-item label="生成 JoinColumn 注释">
						<el-switch v-model="config.joinColumnAnnotation"></el-switch>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="生成 JoinTable 注释">
						<el-switch v-model="config.joinTableAnnotation"></el-switch>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="生成 IdView 属性">
						<el-switch v-model="config.idViewProperty"></el-switch>
					</el-form-item>
				</el-col>
			</el-row>

			<Details open>
				<template #title>
					<el-text>生成实体移除的前后缀</el-text>
				</template>

				<div style="width: calc(100% - 3px - 1em); padding-top: 1em;">
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="表名前缀">
								<el-input v-model="config.tablePrefix"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="表名后缀">
								<el-input v-model="config.tableSuffix"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="表注释前缀">
								<el-input v-model="config.tableCommentPrefix"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="表注释后缀">
								<el-input v-model="config.tableCommentSuffix"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="列名前缀">
								<el-input v-model="config.columnPrefix"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="列名后缀">
								<el-input v-model="config.columnSuffix"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="列注释前缀">
								<el-input v-model="config.columnCommentPrefix"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="列注释后缀">
								<el-input v-model="config.columnCommentSuffix"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</Details>

			<div style="text-align: right">
				<el-button type="info" @click="handleCancel">取消</el-button>

				<el-button type="warning" @click="handleSubmit">保存</el-button>
			</div>
		</el-form>
		<el-empty v-else style="height: 55vh;"></el-empty>
	</div>
</template>