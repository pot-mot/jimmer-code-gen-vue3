<script setup lang="ts">
import {EditPen} from "@element-plus/icons-vue";
import {GenTableCommonView} from "../../../api/__generated/model/static";
import TableIcon from "../../icons/database/TableIcon.vue";
import Comment from "../../common/Comment.vue";
import {DataSourceMenuEventBusProps} from "./events/DataSourceMenuEvents.ts";
import {TableDialogEventBus} from "../TableInfo/TableDialogEventBus.ts";

interface TableItemProps {
	table: GenTableCommonView
}

defineProps<TableItemProps & DataSourceMenuEventBusProps>()
</script>

<template>
	<el-text class="hover-show">
		<TableIcon :type="table.type"></TableIcon>

		<slot name="operations" :table="table" :eventBus="eventBus">
			<el-button @click="eventBus.emit('clickTable', {id: table.id})" link>
				{{ table.name }}
				<Comment :comment="table.comment"></Comment>
			</el-button>

			<el-button @click="TableDialogEventBus.emit('openTable', table.id)"
					   title="编辑" :icon="EditPen" type="warning" class="hover-show-item" link>
			</el-button>
		</slot>
	</el-text>
</template>