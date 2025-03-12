<script setup lang="ts">
import {ColumnItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import Comment from "@/components/global/common/Comment.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";

defineProps<ColumnItemProps>()
</script>

<template>
	<div>
		<el-button @click="eventBus.emit('clickColumn', {id: column.id})" link>
			<ColumnIcon :column="column"></ColumnIcon>
			{{ column.name }}
			<Comment :comment="column.comment"></Comment>
		</el-button>
	</div>
</template>
