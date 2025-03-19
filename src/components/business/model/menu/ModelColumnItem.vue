<script setup lang="ts">
import {ColumnItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import Comment from "@/components/global/common/Comment.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";

defineProps<ColumnItemProps>()
</script>

<template>
	<div class="menu-item">
		<el-text @click="eventBus.emit('clickColumn', {id: column.id})" link>
			<ColumnIcon :column="column"/>
			{{ column.name }}
			<Comment :comment="column.comment"/>
		</el-text>
	</div>
</template>
