<script lang="ts" setup>
import {ref, watch} from "vue";
import {GenConfig, GenConfigProperties} from "@/api/__generated/model/static";
import {sendMessage} from "@/message/message.ts";
import DataSourceIcon from "../../global/icons/database/DataSourceIcon.vue";
import Details from "../../global/common/Details.vue";
import {
	DatabaseNamingStrategyType_CONSTANTS,
	DataSourceType_CONSTANTS,
	GenLanguage_CONSTANTS
} from "@/api/__generated/model/enums"
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {getDefaultModel} from "@/components/business/model/defaultModel.ts";

const genConfigProperties = defineModel<GenConfigProperties>()

const config = ref<GenConfig>(getDefaultModel())

watch(() => genConfigProperties.value, () => {
	config.value = {
		...config.value,
		...genConfigProperties.value
	}
}, {immediate: true})

const emits = defineEmits<FormEmits<GenConfigProperties>>()

const handleSubmit = async () => {
	const newConfig = <GenConfigProperties>config.value
	sendMessage('配置修改成功', 'success')
	emits('submit', newConfig)
}

const handleCancel = () => {
	emits('cancel', <GenConfigProperties>config.value)
}
</script>

<style scoped>
.gen-config-form-part-title {
	font-weight: 600;
	line-height: 2.5em;
}
</style>

<template>
	<el-form>
		<el-row :gutter="24">
			<el-col :span="12">
				<el-form-item label="数据源类型">
					<el-select v-model="config.dataSourceType">
						<template #prefix>
							<DataSourceIcon :type="config.dataSourceType"></DataSourceIcon>
						</template>
						<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
								   :label="dataSourceType"
								   :value="dataSourceType"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="语言">
					<el-select v-model="config.language">
						<el-option v-for="language in GenLanguage_CONSTANTS"
								   :label="language"
								   :value="language"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">表定义</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="默认使用真实外键">
							<el-switch v-model="config.realFk"></el-switch>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="数据库命名策略">
							<el-select v-model="config.databaseNamingStrategy">
								<el-option v-for="namingStrategy in DatabaseNamingStrategyType_CONSTANTS"
										   :label="namingStrategy"
										   :value="namingStrategy"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">实体类配置</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="包路径">
							<el-input v-model="config.packagePath"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="映射表路径">
							<el-input v-model="config.tablePath"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="逻辑删除注释">
							<el-input v-model="config.logicalDeletedAnnotation"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="8">
						<el-form-item label="生成 Table 注释">
							<el-switch v-model="config.tableAnnotation"></el-switch>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item label="生成 Column 注释">
							<el-switch v-model="config.columnAnnotation"></el-switch>
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
						<el-form-item label="生成 IdView">
							<el-switch v-model="config.idViewProperty"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">移除前后缀</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="表名前缀">
							<el-input v-model="config.tableNamePrefixes"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="表名后缀">
							<el-input v-model="config.tableNameSuffixes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="表注释前缀">
							<el-input v-model="config.tableCommentPrefixes"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="表注释后缀">
							<el-input v-model="config.tableCommentSuffixes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="列名前缀">
							<el-input v-model="config.columnNamePrefixes"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="列名后缀">
							<el-input v-model="config.columnNameSuffixes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="列注释前缀">
							<el-input v-model="config.columnCommentPrefixes"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="列注释后缀">
							<el-input v-model="config.columnCommentSuffixes"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">保存</el-button>
		</div>
	</el-form>
</template>
