<script lang="ts" setup>
import TableIcon from "../../../global/icons/database/TableIcon.vue";
import Comment from "../../../global/common/Comment.vue";
import {TableItemProps} from "@/components/business/dataSource/menu/DataSourceMenuProps.ts";

defineProps<TableItemProps>()
</script>

<template>
	<el-text class="hover-show">
		<slot :eventBus="eventBus" :table="table">
			<TableIcon :type="table.type"/>
			<el-button link @click="eventBus.emit('clickTable', {id: table.id})">
				{{ table.name }}
				<Comment :comment="table.comment"/>
			</el-button>
		</slot>

		<slot :eventBus="eventBus" :table="table" name="operations"/>
	</el-text>
</template>
