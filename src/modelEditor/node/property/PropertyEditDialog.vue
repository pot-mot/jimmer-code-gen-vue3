<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {usePropertyEditDialog} from "@/modelEditor/node/property/usePropertyEditDialog.ts";
import PropertyForm from "@/modelEditor/node/property/PropertyForm.vue";

const {
    openState,
    propertyState,
    submit,
    close,
} = usePropertyEditDialog()
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
    >
        <PropertyForm
            v-if="propertyState"
            v-model="propertyState"
            @submit="submit"
            @cancel="close"
        />
    </DragResizeDialog>
</template>
