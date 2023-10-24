<script setup lang="ts">
import {api} from "../../api";
import DragDialog from "../common/DragDialog.vue";
import {ref, watch} from "vue";
import {GenConfig, GenConfigProperties} from "../../api/__generated/model/static";
import {GenLanguage} from "../../api/__generated/model/enums";
import {sendMessage} from "../../utils/message.ts";
import {Tools} from "@element-plus/icons-vue"

const config = ref<GenConfig | undefined>()

const languages = ref<GenLanguage[]>([])

const getData = () => {
	api.configService.getConfig().then(res => {
		config.value = res
	})

	api.entityService.listLanguage().then(res => {
		languages.value = res
	})
}

const openState = ref(false)

watch(() => openState.value, (value) => {
	if (value) {
		getData()
	}
})

const handleSave = async () => {
	await api.configService.setConfig({body: <GenConfigProperties>(config.value)})
	sendMessage('配置修改成功', 'success')
	openState.value = false
}

const handleCancel = () => {
	openState.value = false
}
</script>

<template>
	<div class="button" @click="openState = !openState">
		<el-button link>
			<el-icon size="2em">
				<Tools></Tools>
			</el-icon>
		</el-button>
	</div>

	<DragDialog v-if="openState" @close="openState = false" :y="100">
		<div class="wrapper">
			<el-form v-if="config" label-width="10em" label-position="left" size="default">
				<h3 style="width: 100%; text-align: center; height: 2em; line-height: 2em;">全局生成配置</h3>

				<el-form-item label="语言">
					<el-select v-model="config.language">
						<el-option v-for="language in languages" :label="language" :value="language"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="分隔符">
					<el-input v-model="config.separator"></el-input>
				</el-form-item>

				<el-form-item label="作者">
					<el-input v-model="config.author"></el-input>
				</el-form-item>

				<el-row :gutter="24">
					<el-col :span="16">
						<el-form-item label="表名前缀">
							<el-input v-model="config.tablePrefix"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="生成实体时移除前缀" label-width="10em">
							<el-switch v-model="config.removeTablePrefix"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="16">
						<el-form-item label="表名后缀">
							<el-input v-model="config.tableSuffix"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="生成实体时移除" label-width="10em">
							<el-switch v-model="config.removeTableSuffix"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="16">
						<el-form-item label="列名前缀">
							<el-input v-model="config.columnPrefix"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="生成属性时移除" label-width="10em">
							<el-switch v-model="config.removeColumnPrefix"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="24">
					<el-col :span="16">
						<el-form-item label="列名后缀">
							<el-input v-model="config.columnSuffix"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="生成属性时移除" label-width="10em">
							<el-switch v-model="config.removeColumnSuffix"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="逻辑删除注释">
					<el-input v-model="config.logicalDeletedAnnotation"></el-input>
				</el-form-item>

				<div style="text-align: right">
					<el-button type="info" @click="handleCancel">取消</el-button>

					<el-button type="warning" @click="handleSave">保存</el-button>
				</div>
			</el-form>
		</div>
	</DragDialog>

</template>

<style scoped>
.wrapper {
	width: 100%;
	max-height: 80vh;
	overflow: hidden;
}

.button {
	position: fixed;
	left: 0.5em;
	bottom: 0.5em;
}
</style>