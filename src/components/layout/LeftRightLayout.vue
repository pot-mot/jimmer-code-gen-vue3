<script lang="ts" setup>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
	<splitpanes>
		<pane size="25">
			<div class="menu-wrapper">
				<slot name="left"/>
			</div>
		</pane>
		<pane>
			<slot name="right"/>
		</pane>
	</splitpanes>
</template>

<style scoped>
.menu-wrapper {
	padding: 0.2em 0 3em 1em;
	height: 100%;
	width: 100%;
	overflow: auto;
	white-space: nowrap;
	scrollbar-gutter: stable;
}
</style>
