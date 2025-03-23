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
    <div class="menu-item">
        <el-text @click="(e: MouseEvent) => emits('clickAssociation', e)">
            {{ association.name }}
        </el-text>
    </div>
</template>
