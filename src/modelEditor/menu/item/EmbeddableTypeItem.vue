<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameEditor/NameCommentEditor.vue";

const embeddableType = defineModel<EmbeddableTypeWithProperties>({
    required: true
})

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.embeddableTypeIdSet.has(embeddableType.value.id)
})

const handleFocus = () => {
    focusNode(embeddableType.value.id)
}
</script>

<template>
    <div
        class="embeddable-type-item"
        :class="{selected: isSelected}"
    >
        <NameCommentEditor v-model="embeddableType"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
