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

const props = withDefaults(defineProps<TableItemProps>(), {
	showConfig(props) {
	    return {
			showColumns: false,
			showAssociations: true,
			...props.showConfig
		}
	},
})

const columns = ref<GenColumnCommonView[]>([])
const associations = ref<GenAssociationView[]>([])

const columnsLoading = useLoading()
const associationsLoading = useLoading()

const getColumns = async () => {
	if (!props.showConfig.showColumns) return
	columnsLoading.add()
	columns.value = await api.columnService.query({query: {tableIds: [props.table.id]}})
	columnsLoading.sub()
}

const getAssociations = async () => {
	if (!props.showConfig.showAssociations) return
	associationsLoading.add()
	associations.value = await api.associationService.queryByTable({tableIds: [props.table.id], selectType: "OR"})
	associationsLoading.sub()
}
</script>

<template>
	<Details v-loading="columnsLoading.isLoading() && associationsLoading.isLoading()" @open="() => {
		getColumns()
		getAssociations()
	}" :disabled="!showConfig.showColumns && !showConfig.showAssociations">
		<template #title>
			<el-text>
				<TableIcon :type="table.type"></TableIcon>
				<el-button @click="eventBus.emit('clickTable', {id: table.id})" link>
					{{ table.name }}
					<Comment :comment="table.comment"></Comment>
				</el-button>
			</el-text>
		</template>

		<template v-if="showConfig.showColumns && showConfig.showAssociations">
			<Details v-loading="columnsLoading.isLoading()" @open="getColumns">
				<template #title>
					<el-text>Columns</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="column in columns">
						<ColumnItem :column="column" :event-bus="eventBus"></ColumnItem>
					</li>
				</ul>
			</Details>

			<Details v-loading="associationsLoading.isLoading()" @open="getAssociations">
				<template #title>
					<el-text>Associations</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="association in associations">
						<AssociationItem :association="association" :event-bus="eventBus" :show-config="showConfig"></AssociationItem>
					</li>
				</ul>
			</Details>
		</template>

		<template v-else-if="showConfig.showColumns">
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="column in columns">
					<ColumnItem :column="column" :event-bus="eventBus"></ColumnItem>
				</li>
			</ul>
		</template>

		<template v-else-if="showConfig.showAssociations">
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="association in associations">
					<AssociationItem :association="association" :event-bus="eventBus" :show-config="showConfig"></AssociationItem>
				</li>
			</ul>
		</template>
	</Details>
</template>
