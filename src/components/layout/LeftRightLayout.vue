<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
	<div class="layout">
		<splitpanes>
			<pane size="20">
				<slot name="left"/>
			</pane>
			<pane>
				<slot name="right"/>
			</pane>
		</splitpanes>
	</div>
</template>
