<script lang="ts" setup>
import TableIcon from "../../../global/icons/database/TableIcon.vue";
import Comment from "../../../global/common/Comment.vue";
import {TableItemProps} from "@/components/business/dataSource/menu/DataSourceMenuProps.ts";

defineProps<TableItemProps>()
</script>

<template>
	<div class="hover-show menu-item">
		<slot :eventBus="eventBus" :table="table">
			<el-text @click="eventBus.emit('clickTable', {id: table.id})">
				<TableIcon :type="table.type"/>
				{{ table.name }}
				<Comment :comment="table.comment"/>
			</el-text>
		</slot>

		<slot :eventBus="eventBus" :table="table" name="operations"/>
	</div>
</template>
