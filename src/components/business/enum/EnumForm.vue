<script setup lang="ts">
import EditList from "@/components/global/list/EditList.vue";
import {GenEnumItemsInput, GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {ref, watch} from "vue";
import {enumItemColumns} from "@/components/business/enum/enumItemColumns.ts";
import {EnumType, EnumType_CONSTANTS} from "@/api/__generated/model/enums";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendMessage} from "@/message/message.ts";
import {getDefaultEnum, getDefaultEnumItem} from "@/components/business/enum/defaultEnum.ts";
import {validateEnumItem} from "@/shape/GenEnumModelInput.ts";

const props = defineProps<{
	enum?: Partial<GenModelInput_TargetOf_enums>
}>()

const emits = defineEmits<FormEmits<GenEnumItemsInput>>()

const genEnum = ref<GenEnumItemsInput>(getDefaultEnum())

const getData = async () => {
	if (props.enum) {
		genEnum.value = {
			...getDefaultEnum(),
			...props.enum
		}
	} else {
		genEnum.value = getDefaultEnum()
	}
}

watch(() => props.enum, () => {
	getData()
}, {immediate: true})

watch(() => genEnum.value.enumType, (value) => {
	if (value === 'NAME') {
		genEnum.value.items.forEach((item) => {
			item.mappedValue = item.name
		})
	} else if (value === 'ORDINAL') {
		genEnum.value.items.forEach((item, index) => {
			item.mappedValue = index.toString()
		})
	}
})


const handleSubmit = () => {
	const messageList: string[] = []

	if (genEnum.value.items.length === 0) {
		messageList.push('必须至少要有一个枚举项');
	}
	if (genEnum.value.items.some(item => item.name.length === 0)) {
		messageList.push('枚举项的名称必须不为空');
	} else {
		const uniqueItemNames = new Set(genEnum.value.items.map(item => item.name))
		if (uniqueItemNames.size !== genEnum.value.items.length) {
			messageList.push('枚举项的名称必须不重复');
		}
	}

	if (genEnum.value.enumType === 'ORDINAL') {
		try {
			if (genEnum.value.items.some(item => !Number.isInteger(Number(item.mappedValue)))) {
				messageList.push('ordinal 枚举项的值必须为整数');
			}

			genEnum.value.items.forEach((item) => {
				item.mappedValue = parseInt(item.mappedValue).toString()
			})
		} catch (e) {
			messageList.push('ordinal 枚举项的值必须为整数');
		}
	}

	if (genEnum.value.enumType === "NAME" || genEnum.value.enumType === 'ORDINAL') {
		if (genEnum.value.items.some(item => item.mappedValue.length === 0)) {
			messageList.push('枚举项的值必须不为空');
		} else {
			const uniqueItemNames = new Set(genEnum.value.items.map(item => item.mappedValue))
			if (uniqueItemNames.size !== genEnum.value.items.length) {
				messageList.push('枚举项的值必须不重复');
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
	<el-form style="width: 98%;">
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
			:defaultLine="getDefaultEnumItem"
			:json-schema-validate="validateEnumItem"
			style="padding-bottom: 2em;">
			<template #value="{data}">
				<el-input v-if="genEnum.enumType === 'NAME'" v-model="data.mappedValue"></el-input>
				<el-input-number v-else-if="genEnum.enumType === 'ORDINAL'"
								 v-model="data.mappedValue"></el-input-number>
				<el-input v-else disabled :model-value="data.mappedValue"></el-input>
			</template>
		</EditList>

		<div style="text-align: right; position: absolute; bottom: 0.5em; left: 1em; right: 1em;">
			<el-button type="info" @click="handleCancel">取消</el-button>
			<el-button type="warning" @click="handleSubmit">提交</el-button>
		</div>
	</el-form>
</template>
