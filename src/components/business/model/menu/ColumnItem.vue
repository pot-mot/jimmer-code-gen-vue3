<script setup lang="ts">
import {ColumnItemProps} from "@/components/business/model/menu/ModelMenuProps.ts";
import Comment from "@/components/global/common/Comment.vue";
import ColumnIcon from "@/components/global/icons/database/ColumnIcon.vue";

const props = defineProps<ColumnItemProps>()
</script>

<template>
	<div>
		<el-text>
			<span><ColumnIcon :column="column"></ColumnIcon></span>
			{{ column.name }}
			<Comment :comment="column.comment"></Comment>
		</el-text>
	</div>
</template>
