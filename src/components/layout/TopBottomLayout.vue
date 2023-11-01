<script lang="ts" setup>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<template>
	<splitpanes horizontal>
		<pane size="50">
			<slot name="top"/>
		</pane>
		<pane>
			<slot name="bottom"/>
		</pane>
	</splitpanes>
</template>
