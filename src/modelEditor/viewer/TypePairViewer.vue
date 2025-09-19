<script setup lang="ts">
defineProps<{
    typePair: DeepReadonly<TypeSelectPair>
}>()
</script>

<template>
    <span>
        {{ typePair.backEndType.rawType }}
    </span>
    <span>
         {{ typePair.sqlType.type }}
    </span>
</template>
