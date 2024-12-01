<script setup lang="ts">
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import EntityDialog from "@/components/pages/ModelEditor/dialogs/entity/EntityDialog.vue";

const store = useEntityDialogsStore()
</script>

<template>
    <template v-for="[key, value] in store.items" :key="key">
        <EntityDialog :id="key" :entity="value" @close="store.close(key)"/>
    </template>
</template>