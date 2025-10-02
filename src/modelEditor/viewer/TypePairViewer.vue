<script setup lang="ts">
defineProps<{
    typePair: DeepReadonly<CrossType>
}>()
</script>

<template>
    <span class="type-pair-viewer">
        <span class="sql-type">
             {{ typePair.sqlType.type }}
        </span>
        -
        <span class="back-end-type">
            {{ typePair.jvmType.fullTypeExpression }}
        </span>
        -
        <span class="typescript-type">
            {{ typePair.tsType.fullTypeExpression }}
        </span>
    </span>
</template>
