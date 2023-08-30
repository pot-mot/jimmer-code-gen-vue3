<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
	<splitpanes>
		<pane size="25">
			<slot name="left"/>
		</pane>
		<pane>
			<slot name="right"/>
		</pane>
	</splitpanes>
</template>
