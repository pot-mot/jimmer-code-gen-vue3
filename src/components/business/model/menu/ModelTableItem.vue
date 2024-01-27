<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenAssociationView, GenColumnCommonView} from "@/api/__generated/model/static";
import {useLoading} from "@/utils/useLoading.ts";
import {api} from "@/api";
import {TableItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import AssociationItem from "@/components/business/model/menu/ModelAssociationItem.vue";
import ColumnItem from "@/components/business/model/menu/ModelColumnItem.vue";
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

const columnsLoading = useLoading('ModelTableItem.columnsLoading')
const associationsLoading = useLoading('ModelTableItem.associationsLoading')

const getColumns = async () => {
	if (!props.showConfig.showColumns) return
	const flag = columnsLoading.start('get')
	columns.value = await api.columnService.query({
		body: {
			tableIds: [props.table.id]
		}
	})
	columnsLoading.stop(flag)
}

const getAssociations = async () => {
	if (!props.showConfig.showAssociations) return
	const flag = associationsLoading.start('get')
	associations.value = await api.associationService.queryByTable({
		body: {
			tableIds: [props.table.id],
			selectType: "OR"
		}
	})
	associationsLoading.stop(flag)
}
</script>

<template>
	<Details v-loading="columnsLoading.isLoading.value && associationsLoading.isLoading.value" @open="() => {
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
			<Details v-loading="columnsLoading.isLoading.value" @open="getColumns">
				<template #title>
					<el-text>Columns</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="column in columns">
						<ColumnItem :column="column" :event-bus="eventBus"></ColumnItem>
					</li>
				</ul>
			</Details>

			<Details v-loading="associationsLoading.isLoading.value" @open="getAssociations">
				<template #title>
					<el-text>Associations</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="association in associations">
						<AssociationItem :association="association" :event-bus="eventBus"
										 :show-config="showConfig"></AssociationItem>
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
					<AssociationItem :association="association" :event-bus="eventBus"
									 :show-config="showConfig"></AssociationItem>
				</li>
			</ul>
		</template>
	</Details>
</template>
