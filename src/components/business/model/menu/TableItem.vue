<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenAssociationView, GenColumnCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/hooks/useLoading.ts";
import {api} from "@/api";
import {TableItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import AssociationItem from "@/components/business/model/menu/AssociationItem.vue";
import ColumnItem from "@/components/business/model/menu/ColumnItem.vue";
import TableIcon from "@/components/global/icons/database/TableIcon.vue";
import Comment from "@/components/global/common/Comment.vue";

const props = defineProps<TableItemProps>()

const columns = ref<GenColumnCommonView[]>([])
const associations = ref<GenAssociationView[]>([])

const columnsLoading = useLoading()
const associationsLoading = useLoading()

const getColumns = async () => {
	columnsLoading.add()
	columns.value = await api.columnService.query({query: {tableIds: [props.table.id]}})
	columnsLoading.sub()
}

const getAssociations = async () => {
	associationsLoading.add()
	associations.value = await api.associationService.queryByTable({tableIds: [props.table.id], selectType: "OR"})
	associationsLoading.sub()
}
</script>

<template>
	<Details v-loading="columnsLoading.isLoading() && associationsLoading.isLoading()" @open="() => {
		getColumns()
		getAssociations()
	}">
		<template #title>
			<el-text>
				<span><TableIcon :type="table.type"></TableIcon></span>
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-text>
		</template>

		<Details v-loading="columnsLoading.isLoading()" @open="getColumns">
			<template #title>
				<el-text>Columns</el-text>
			</template>

			<ul>
				<li v-for="column in columns">
					<ColumnItem :column="column"></ColumnItem>
				</li>
			</ul>
		</Details>

		<Details v-loading="associationsLoading.isLoading()" @open="getAssociations">
			<template #title>
				<el-text>Associations</el-text>
			</template>

			<ul>
				<li v-for="association in associations">
					<AssociationItem :association="association"></AssociationItem>
				</li>
			</ul>
		</Details>
	</Details>
</template>
