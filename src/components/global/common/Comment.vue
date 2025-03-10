<script lang="ts" setup>
interface CommentProps {
	comment: string | undefined
}

defineProps<CommentProps>()
</script>

<template>
	<span class="comment">{{ comment && comment.trim().length > 0 ? `/* ${comment.trim()} */` : "" }}</span>
</template>

<style scoped>
.comment {
	white-space: nowrap;
	padding: 0 0.3em;
	color: var(--comment-color);
	font-size: 0.9em;
	font-weight: 400;
}
</style>
