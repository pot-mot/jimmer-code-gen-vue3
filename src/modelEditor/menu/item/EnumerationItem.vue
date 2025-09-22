<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameComment/NameCommentEditor.vue";

const enumeration = defineModel<Enumeration>({required: true})

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.enumerationIdSet.has(enumeration.value.id)
})

const handleFocus = () => {
    focusNode(enumeration.value.id)
}
</script>

<template>
    <div
        class="enumeration-item"
        :class="{selected: isSelected}"
    >
        <NameCommentEditor v-model="enumeration" :font-size="14"/>

        <div class="tool">
            <button @click.stop="handleFocus">
                <IconAim/>
            </button>
        </div>
    </div>
</template>
