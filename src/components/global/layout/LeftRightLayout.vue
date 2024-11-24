<script lang="ts" setup>
import {Pane, Splitpanes} from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

withDefaults(
    defineProps<{
        leftSize?: number | undefined
    }>(),
    {
        leftSize: 22.5
    }
)
</script>

<template>
    <Splitpanes>
        <Pane :size="leftSize">
            <slot name="left"/>
        </Pane>
        <pane>
            <slot name="right"/>
        </pane>
    </Splitpanes>
</template>
