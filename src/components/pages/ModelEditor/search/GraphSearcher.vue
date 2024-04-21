<script lang="ts" setup>
import {Graph} from "@antv/x6";
import Searcher from "@/components/global/search/Searcher.vue";
import {focus} from "@/components/global/graphEditor/view/viewOperation.ts"
import {searchNodesByKeywords} from "@/components/pages/ModelEditor/search/search.ts";
import Comment from "@/components/global/common/Comment.vue";
import {ref} from "vue";

interface SearcherProps {
	graph: Graph,
}

const props = defineProps<SearcherProps>()

const initW = ref(400)

const initX = ref(document.documentElement.clientWidth - initW.value - 100)
</script>

<template>
	<Searcher
		:search="(keyword) => searchNodesByKeywords(graph, keyword.split(/\s+/))"
		@select="(item) => focus(props.graph, item)"
		:target="graph.container"
		:init-x="initX"
		:init-w="initW"
		:init-y="40">

		<template #buttonContent="{item}">
			<span style="height: 1.5em; line-height: 1.5em; font-size: 0.9em;">
				<span v-text="item.getData().table.name"></span>
				<Comment :comment="item.getData().table.comment"></Comment>
			</span>
		</template>
	</Searcher>
</template>
