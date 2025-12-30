<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {usePropertyEditDialog} from "@/modelEditor/property/usePropertyEditDialog.ts";
import PropertyForm from "@/modelEditor/property/PropertyForm.vue";

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
            :property-with-source="propertyState"
            @submit="submit"
            @cancel="close"
        />
    </DragResizeDialog>
</template>
