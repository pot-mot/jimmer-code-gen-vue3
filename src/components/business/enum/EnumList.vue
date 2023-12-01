<script setup lang="ts">
import {onMounted, ref} from "vue";
import {api} from "@/api";
import {GenEnumView} from "@/api/__generated/model/static";
import {ListItemEmits} from "@/components/global/list/ListEmits.ts";

defineEmits<{
	(event: "select"): void
}>()

const genEnums = ref<GenEnumView[]>([])

const getData = async () => {
	genEnums.value = await api.enumService.query({query: {}})
}

onMounted(() => {
	getData()
})

const emits = defineEmits<ListItemEmits<GenEnumView>>()
</script>

<template>
	<template v-for="genEnum in genEnums">
		<slot :genEnum="genEnum">
			<el-text @click="emits('item:click', genEnum)">{{ genEnum.name }} {{ genEnum.comment }}</el-text>
		</slot>
	</template>
</template>