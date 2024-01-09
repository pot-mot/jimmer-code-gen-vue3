<script lang="ts" setup>
import {api} from "@/api";
import {onMounted, ref} from "vue";
import {GenConfig, GenConfigProperties} from "@/api/__generated/model/static";
import {sendMessage} from "@/utils/message.ts";
import DataSourceIcon from "../../global/icons/database/DataSourceIcon.vue";
import Details from "../../global/common/Details.vue";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums"
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {GenerateConfigurator} from "../globalConfig/constant.ts";

const genConfigStore = useGenConfigStore()

const config = ref<GenConfig>()

onMounted(async () => {
	if (genConfigStore.isLoaded) {
		config.value = genConfigStore.genConfig
	} else {
		config.value = await genConfigStore.reset()
	}
})

const emits = defineEmits<FormEmits<GenConfigProperties>>()

const handleSubmit = async () => {
	const newConfig = <GenConfigProperties>config.value
	await api.configService.setConfig({body: newConfig})
	await genConfigStore.reset()
	sendMessage('配置修改成功', 'success')
	emits('submit', newConfig)
}

const handleCancel = () => {
	emits('cancel', <GenConfigProperties>config.value)
}
</script>

<template>
	<div v-loading="!genConfigStore.isLoaded">
		<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">{{ GenerateConfigurator.GenConfigForm.label }}</h3>

		<el-form v-if="config" size="small">
			<el-row :gutter="24">
				<el-col :span="8">
					<el-form-item label="数据源类型">
						<el-select v-model="config.dataSourceType">
							<template #prefix>
								<DataSourceIcon :type="config.dataSourceType"></DataSourceIcon>
							</template>
							<el-option v-for="dataSourceType in DataSourceType_CONSTANTS" :label="dataSourceType"
									   :value="dataSourceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="语言">
						<el-select v-model="config.language">
							<el-option v-for="language in GenLanguage_CONSTANTS" :label="language" :value="language"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="作者">
						<el-input v-model="config.author"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<Details open style="padding-bottom: 0.5em">
				<template #title>
					<el-text style="line-height: 2.5em;" size="default">表定义</el-text>
				</template>

				<div style="width: calc(100% - 3px - 1em);">
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="真实外键">
								<el-switch v-model="config.realFk"></el-switch>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</Details>

			<Details open style="padding-bottom: 0.5em">
				<template #title>
					<el-text style="line-height: 2.5em;" size="default">实体类配置</el-text>
				</template>

				<div style="width: calc(100% - 3px - 1em);">
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
							<el-form-item label="启用小写映射">
								<el-switch v-model="config.lowerCaseName"></el-switch>
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

			<Details open style="padding-bottom: 3em">
				<template #title>
					<el-text style="line-height: 2.5em;" size="default">移除前后缀</el-text>
				</template>

				<div style="width: calc(100% - 3px - 1em);">
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

			<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
				<el-button type="info" @click="handleCancel">取消</el-button>
				<el-button type="warning" @click="handleSubmit">保存</el-button>
			</div>
		</el-form>
		<el-empty v-else style="height: 55vh;"></el-empty>
	</div>
</template>
