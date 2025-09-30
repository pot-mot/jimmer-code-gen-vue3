<script setup lang="ts">
defineProps<{
    typePair: DeepReadonly<TypeSelectPair>
}>()
</script>

<template>
    <span class="type-pair-viewer">
        <span class="back-end-type">
            {{ typePair.backEndType.rawType }}
        </span>
        -
        <span class="sql-type">
             {{ typePair.sqlType.type }}
        </span>
    </span>
</template>
