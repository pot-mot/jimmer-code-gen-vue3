<script lang="ts" setup>
import {Graph} from "@antv/x6";
import Searcher from "@/components/global/common/Searcher.vue";
import {focus} from "@/components/business/graphEditor/common/viewOperation.ts"
import {searchNodesByKeywords} from "@/components/business/graphEditor/common/search.ts";
import Comment from "@/components/global/common/Comment.vue";

interface SearcherProps {
	graph: Graph,
}

const props = defineProps<SearcherProps>()
</script>

<template>
	<Searcher
		:search="(keyword) => searchNodesByKeywords(graph, keyword.split(/\s+/))"
		:choose="(item) => focus(props.graph, item)"
		:target="graph.container"
		:init-x="1050"
		:init-y="40"
		:init-w="400">
		<template #buttonContent="{item}">
			<span style="height: 1.5em; line-height: 1.5em; font-size: 0.9em;">
				<span v-text="item.getData().table.name"></span>
				<Comment :comment="item.getData().table.comment"></Comment>
			</span>
		</template>
	</Searcher>
</template>
