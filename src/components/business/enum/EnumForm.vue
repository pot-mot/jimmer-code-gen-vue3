<script setup lang="ts">
import EditList from "@/components/global/list/EditList.vue";
import {GenEnumItemsInput} from "@/api/__generated/model/static";
import {onMounted, ref, watch} from "vue";
import {api} from "@/api";
import {enumItemColumns} from "@/components/business/enum/enumItemColumns.ts";
import {EnumType, EnumType_CONSTANTS} from "@/api/__generated/model/enums";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {cloneDeep} from "lodash";
import {sendMessage} from "@/utils/message.ts";

const props = defineProps<{
	id: number | undefined
}>()

const defaultEnum = {
	name: "",
	comment: "",
	remark: "",
	items: [],
	orderKey: 0,
}

const defaultItem = {
	name: "",
	value: "",
	comment: ""
}

const emits = defineEmits<FormEmits<GenEnumItemsInput>>()

const genEnum = ref<GenEnumItemsInput>(cloneDeep(defaultEnum))

const getData = async () => {
	if (props.id) {
		const res = await api.enumService.get({id: props.id})
		if (res) {
			genEnum.value = res
		} else {
			sendMessage('枚举不存在', 'error')
			genEnum.value = cloneDeep(defaultEnum)
		}
 	} else {
		genEnum.value = cloneDeep(defaultEnum)
	}
}

onMounted(() => {
	getData()
})

watch(() => genEnum.value.enumType, (value) => {
	if (value == 'NAME') {
		genEnum.value.items.forEach((item) => {
			item.value = item.name
		})
	} else if (value == 'ORDINAL') {
		genEnum.value.items.forEach((item, index) => {
			item.value = index.toString()
		})
	}
})


const handleSubmit = () => {
	const messageList: string[] = []

	if (genEnum.value.items.length == 0) {
		messageList.push('必须至少要有一个枚举项');
	}
	if (genEnum.value.items.some(item => item.name.length == 0)) {
		messageList.push('枚举项必须不为空');
	} else {
		const uniqueItemNames = new Set(genEnum.value.items.map(item => item.name))
		if (uniqueItemNames.size != genEnum.value.items.length) {
			messageList.push('枚举项必须不重复');
		}
	}

	if (genEnum.value.enumType == 'ORDINAL') {
		try {
			if (genEnum.value.items.some(item => !Number.isInteger(Number(item.value)))) {
				messageList.push('ordinal 枚举项的值必须为整数');
			}

			genEnum.value.items.forEach((item) => {
				item.value = parseInt(item.value).toString()
			})
		} catch (e) {
			messageList.push('ordinal 枚举项的值必须为整数');
		}
	}

	if (genEnum.value.enumType == "NAME" || genEnum.value.enumType == 'ORDINAL') {
		if (genEnum.value.items.some(item => item.value.length == 0)) {
			messageList.push('值必须不为空');
		} else {
			const uniqueItemNames = new Set(genEnum.value.items.map(item => item.value))
			if (uniqueItemNames.size != genEnum.value.items.length) {
				messageList.push('枚举项必须不重复');
			}
		}
	}

	if (messageList.length > 0) {
		messageList.forEach(it => sendMessage(it, 'warning'))
		return
	}

	genEnum.value.items.forEach((item, index) => {
		item.orderKey = index
	})

	emits('submit', genEnum.value)
}

const handleCancel = () => {
	emits('cancel', genEnum.value)
}
</script>

<template>
	<el-form>
		<Line height="3em">
			<LineItem>
				<el-form-item label="名称">
					<el-input v-model="genEnum.name"></el-input>
				</el-form-item>
			</LineItem>

			<LineItem>
				<el-form-item label="注释">
					<el-input v-model="genEnum.comment"></el-input>
				</el-form-item>
			</LineItem>

			<LineItem>
				<el-form-item label="类型">
					<el-select v-model="genEnum.enumType" @change="(value: string) => {
						if ((EnumType_CONSTANTS as ReadonlyArray<string>).includes(value)) {
							genEnum.enumType = <EnumType>value
						} else {
							genEnum.enumType = undefined
						}
					}">
						<el-option label="不设置" value=""></el-option>
						<el-option v-for="type in EnumType_CONSTANTS" :value="type"></el-option>
					</el-select>
				</el-form-item>
			</LineItem>
		</Line>

		<el-form-item label="备注">
			<el-input type="textarea" v-model="genEnum.remark"></el-input>
		</el-form-item>

		<EditList
			v-model:lines="genEnum.items"
			:columns="enumItemColumns"
			:defaultLine="defaultItem">
			<template #value="{data}">
				<el-input v-if="genEnum.enumType == 'NAME'" v-model="data.value"></el-input>
				<el-input v-else-if="genEnum.enumType == 'ORDINAL'" type="number" v-model="data.value"></el-input>
				<el-input v-else disabled :model-value="data.value"></el-input>
			</template>
		</EditList>

		<div style="text-align: right;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
</template>
