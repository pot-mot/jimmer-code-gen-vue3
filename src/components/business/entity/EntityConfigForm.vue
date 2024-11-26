<script setup lang="ts">
import {GenEntityConfigInput, GenEntityDetailView} from "@/api/__generated/model/static";
import {FormEmits} from "@/components/global/form/FormEmits.ts";
import {cloneDeep} from "lodash";
import {watch, ref} from "vue";

const props = defineProps<{
	entity: GenEntityDetailView
}>()

const entity = ref<GenEntityDetailView>(
	cloneDeep(props.entity)
)

watch(() => props.entity, (value) => {
	entity.value = cloneDeep(value)
})

defineEmits<FormEmits<
	GenEntityConfigInput,
	GenEntityDetailView
>>()
</script>

<template>
	<el-form style="width: calc(100% - 0.5rem);">
	</el-form>
</template>
