<script setup lang="ts">
import EditList from "@/components/global/list/EditList.vue";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";
import {DeepReadonly, ref, watch} from "vue";
import {enumItemColumns} from "@/components/business/enum/enumItemColumns.ts";
import {EnumType, EnumType_CONSTANTS} from "@/api/__generated/model/enums";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {sendMessage} from "@/message/message.ts";
import {getDefaultEnum, getDefaultEnumItem} from "@/components/business/enum/defaultEnum.ts";
import {validateEnumItem} from "@/shape/GenEnumModelInput.ts";

const props = defineProps<{
	enum?: Partial<GenModelInput_TargetOf_enums>,

	validate: (genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => string[],
}>()

const emits = defineEmits<FormEmits<GenModelInput_TargetOf_enums>>()

const genEnum = ref<GenModelInput_TargetOf_enums>(getDefaultEnum())

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

const handleEnumTypeChange = (value: string) => {
	if ((EnumType_CONSTANTS as DeepReadonly<Array<string>>).includes(value)) {
		genEnum.value.enumType = value as EnumType
	} else {
		genEnum.value.enumType = undefined
	}
}

const handleSubmit = () => {
	const messageList = props.validate(genEnum.value)

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
	<el-form style="width: calc(100% - 0.5rem);">
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
					<el-select v-model="genEnum.enumType" @change="handleEnumTypeChange">
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
