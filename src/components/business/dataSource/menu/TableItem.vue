<script lang="ts" setup>
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "@/api/__generated/model/static";
import TableIcon from "../../../global/icons/database/TableIcon.vue";
import Comment from "../../../global/common/Comment.vue";
import {DataSourceMenuEventsProps} from "./DataSourceMenuEvents.ts";
import {TableDialogManagerEventBus} from "@/components/pages/AssociationEditor/tableInfo/TableDialogManagerEventBus.ts";

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps & DataSourceMenuEventsProps>()
</script>

<template>
	<el-text class="hover-show">
		<TableIcon :type="table.type"></TableIcon>

		<slot :eventBus="eventBus" :table="table">
			<el-button link @click="eventBus.emit('clickTable', {id: table.id})">
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-button>
		</slot>

		<slot :eventBus="eventBus" :table="table" name="operations">
			<el-button
				:icon="EditPen"
				class="hover-show-item" link title="编辑" type="warning"
				@click="TableDialogManagerEventBus.emit('openTable', table.id)">
			</el-button>
		</slot>
	</el-text>
</template>