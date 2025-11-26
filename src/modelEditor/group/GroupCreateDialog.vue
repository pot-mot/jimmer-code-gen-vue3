<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import GroupForm from "@/modelEditor/group/GroupForm.vue";
import {useGroupCreateDialog} from "@/modelEditor/group/useGroupCreateDialog.ts";

const {
    openState,
    groupState,
    submit,
    close,
} = useGroupCreateDialog()
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        can-resize
        modal
        :init-w="400"
        :init-h="290"
    >
        <GroupForm
            v-if="groupState"
            v-model="groupState"
            @submit="submit"
            @cancel="close"
        />
    </DragResizeDialog>
</template>
