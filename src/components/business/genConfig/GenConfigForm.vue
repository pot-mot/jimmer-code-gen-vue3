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
import {useI18nStore} from "@/store/i18n/i18nStore.ts";
import AnnotationEditor from "@/components/business/annotation/AnnotationEditor.vue";
import {useJdbcTypeStore} from "@/store/jdbcType/jdbcTypeStore.ts";

const i18nStore = useI18nStore()

const jdbcTypeStore = useJdbcTypeStore()

const genConfigProperties = defineModel<GenConfigProperties>({
    required: true
})

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
				<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_dataSourceType')">
					<el-select v-model="config.dataSourceType">
						<template #prefix>
							<DataSourceIcon :type="config.dataSourceType"></DataSourceIcon>
						</template>
						<el-option v-for="dataSourceType in DataSourceType_CONSTANTS"
								   :label="dataSourceType"
								   :value="dataSourceType"/>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_language')">
					<el-select v-model="config.language">
						<el-option v-for="language in GenLanguage_CONSTANTS"
								   :label="language"
								   :value="language"/>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">{{ i18nStore.translate('LABEL_GenConfigForm_tableDefinition') }}</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_defaultRealFk')">
							<el-switch v-model="config.realFk"/>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_databaseNamingStrategy')">
							<el-select v-model="config.databaseNamingStrategy">
								<el-option v-for="namingStrategy in DatabaseNamingStrategyType_CONSTANTS"
										   :label="namingStrategy"
										   :value="namingStrategy"/>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">{{ i18nStore.translate('LABEL_GenConfigForm_entityClassConfig') }}</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_packagePath')">
							<el-input v-model="config.packagePath"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tablePath')">
							<el-input v-model="config.tablePath"/>
						</el-form-item>
					</el-col>

                    <el-col :span="12">
                        <el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_defaultIdType')">
                            <el-select v-if="jdbcTypeStore.isLoaded" v-model="config.defaultIdType">
                                <el-option v-for="jdbcType in jdbcTypeStore.list" :label="jdbcType.type" :value="jdbcType.code"/>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_generatedIdAnnotation')">
                            <AnnotationEditor v-model="config.generatedIdAnnotation"/>
                        </el-form-item>
                    </el-col>

					<el-col :span="24">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_logicalDeletedAnnotation')">
                            <AnnotationEditor v-model="config.logicalDeletedAnnotation"/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="8">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tableAnnotation')">
							<el-switch v-model="config.tableAnnotation"/>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_columnAnnotation')">
							<el-switch v-model="config.columnAnnotation"/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="8">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_joinColumnAnnotation')">
							<el-switch v-model="config.joinColumnAnnotation"/>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_joinTableAnnotation')">
							<el-switch v-model="config.joinTableAnnotation"/>
						</el-form-item>
					</el-col>

					<el-col :span="8">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_idViewProperty')">
							<el-switch v-model="config.idViewProperty"/>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<Details open>
			<template #title>
				<el-text class="gen-config-form-part-title" size="default">{{ i18nStore.translate('LABEL_GenConfigForm_removeSuffix') }}</el-text>
			</template>

			<div style="width: calc(100% - 3px - 1em);">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tableNamePrefixes')">
							<el-input v-model="config.tableNamePrefixes"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tableNameSuffixes')">
							<el-input v-model="config.tableNameSuffixes"/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tableCommentPrefixes')">
							<el-input v-model="config.tableCommentPrefixes"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_tableCommentSuffixes')">
							<el-input v-model="config.tableCommentSuffixes"/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_columnNamePrefixes')">
							<el-input v-model="config.columnNamePrefixes"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_columnNameSuffixes')">
							<el-input v-model="config.columnNameSuffixes"/>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_columnCommentPrefixes')">
							<el-input v-model="config.columnCommentPrefixes"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item :label="i18nStore.translate('LABEL_GenConfigForm_columnCommentSuffixes')">
							<el-input v-model="config.columnCommentSuffixes"/>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</Details>

		<div style="text-align: right; position: absolute; bottom: 0.5em; right: 1em;">
			<el-button type="info" @click="handleCancel">{{ i18nStore.translate('BUTTON_cancel') }}</el-button>
			<el-button type="primary" @click="handleSubmit">{{ i18nStore.translate('BUTTON_save') }}</el-button>
		</div>
	</el-form>
</template>
