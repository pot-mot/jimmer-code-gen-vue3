<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameEditor/NameCommentEditor.vue";

const entity = defineModel<EntityWithProperties>({required: true})

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.entityIdSet.has(entity.value.id)
})

const handleFocus = () => {
    focusNode(entity.value.id)
}
</script>

<template>
    <div
        class="entity-item"
        :class="{selected: isSelected}"
    >
        <NameCommentEditor v-model="entity"/>

        <div class="tool">
            <button @click.stop="handleFocus">
                <IconAim/>
            </button>
        </div>
    </div>
</template>
