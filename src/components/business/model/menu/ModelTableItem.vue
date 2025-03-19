<script setup lang="ts">
import Details from "@/components/global/common/Details.vue";
import {ref} from "vue";
import {GenAssociationView, GenColumnView} from "@/api/__generated/model/static";
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

const columns = ref<GenColumnView[]>([])
const associations = ref<GenAssociationView[]>([])

const columnsLoading = useLoading('ModelTableItem.columnsLoading')
const associationsLoading = useLoading('ModelTableItem.associationsLoading')

const getColumns = columnsLoading.withLoading('get', async () => {
	if (!props.showConfig.showColumns) return
	columns.value = await api.columnService.query({
		body: {
			tableIds: [props.table.id]
		}
	})
})

const getAssociations = associationsLoading.withLoading('get', async () => {
	if (!props.showConfig.showAssociations) return
	associations.value = await api.associationService.queryByTable({
		body: {
			tableIds: [props.table.id],
			selectType: "OR"
		}
	})
})
</script>

<template>
	<Details v-loading="columnsLoading.isLoading.value && associationsLoading.isLoading.value" @open="() => {
		getColumns()
		getAssociations()
	}" :disabled="!showConfig.showColumns && !showConfig.showAssociations">
		<template #title>
			<div class="menu-item">
				<el-text @click="eventBus.emit('clickTable', {id: table.id})">
					<TableIcon :type="table.type"/>
					{{ table.name }}
					<Comment :comment="table.comment"/>
				</el-text>
			</div>
		</template>

		<template v-if="showConfig.showColumns && showConfig.showAssociations">
			<Details v-loading="columnsLoading.isLoading.value" @open="getColumns">
				<template #title>
					<el-text>Columns</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="column in columns" :key="column.id">
						<ColumnItem :column="column" :event-bus="eventBus"/>
					</li>
				</ul>
			</Details>

			<Details v-loading="associationsLoading.isLoading.value" @open="getAssociations">
				<template #title>
					<el-text>Associations</el-text>
				</template>

				<ul style="padding: 0 0 0.5em 0.5em;">
					<li v-for="association in associations" :key="association.id">
						<AssociationItem :association="association" :event-bus="eventBus" :show-config="showConfig"/>
					</li>
				</ul>
			</Details>
		</template>

		<template v-else-if="showConfig.showColumns">
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="column in columns" :key="column.id">
					<ColumnItem :column="column" :event-bus="eventBus"/>
				</li>
			</ul>
		</template>

		<template v-else-if="showConfig.showAssociations">
			<ul style="padding: 0 0 0.5em 0.5em;">
				<li v-for="association in associations" :key="association.id">
					<AssociationItem :association="association" :event-bus="eventBus" :show-config="showConfig"/>
				</li>
			</ul>
		</template>
	</Details>
</template>
