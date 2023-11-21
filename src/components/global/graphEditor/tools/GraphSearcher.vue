<script lang="ts" setup>
import {Graph, Node} from "@antv/x6";
import Searcher from "@/components/global/common/Searcher.vue";
import {focus} from "@/components/global/graphEditor/operations/viewOperation.ts"
import {matchNode} from "@/components/global/graphEditor/search.ts";
import Comment from "@/components/global/common/Comment.vue";

interface SearcherProps {
	graph: Graph,
}

const props = defineProps<SearcherProps>()
</script>

<template>
	<Searcher
		:data="() => graph.getNodes()"
		:match="(keyword, item) => matchNode(item, keyword.split(/\s+/))"
		:choose="(item) => focus(props.graph, item)"
		:target="graph.container"
		:init-x="1050"
		:init-y="40">
		<template #buttonContent="{item}">
			<span style="height: 1.5em; line-height: 1.5em; font-size: 0.9em;">
				{{ (item as any as Node).getData().table.name }}
				<Comment :comment="(item as any as Node).getData().table.comment"></Comment>
			</span>
		</template>
	</Searcher>
</template>