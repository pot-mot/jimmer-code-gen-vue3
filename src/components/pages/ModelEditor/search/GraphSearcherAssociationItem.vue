<script setup lang="ts">
import {GenAssociationModelInput} from "@/api/__generated/model/static";

defineProps<{
    association: GenAssociationModelInput,
    associationKeywords: string[],
}>()

const emits = defineEmits<{
    (event: "clickAssociation", e: MouseEvent): void,
}>()
</script>

<template>
    <div>
        <el-button link @click="(e: MouseEvent) => emits('clickAssociation', e)">
            {{ association.name }}
        </el-button>
    </div>
</template>
