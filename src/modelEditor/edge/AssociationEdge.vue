<script setup lang="ts">
import {BezierEdge, type EdgeProps} from "@vue-flow/core";
import type {AssociationEdge} from "@/modelEditor/edge/AssociationEdge.ts";

const props = defineProps<EdgeProps<AssociationEdge["data"]>>()
</script>

<template>
    <g>
        <BezierEdge
            ref="bezierRef"
            v-bind.prop="props"
            class="content-edge-line"
        />
    </g>
</template>
