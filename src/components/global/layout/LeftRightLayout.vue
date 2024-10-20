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
    <splitpanes>
        <pane :size="leftSize">
            <slot name="left"/>
        </pane>
        <pane>
            <slot name="right"/>
        </pane>
    </splitpanes>
</template>
