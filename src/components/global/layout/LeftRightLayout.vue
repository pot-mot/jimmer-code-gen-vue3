<script lang="ts" setup>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
	<splitpanes>
		<pane size="22.5">
			<slot name="left"/>
		</pane>
		<pane>
			<slot name="right"/>
		</pane>
	</splitpanes>
</template>
