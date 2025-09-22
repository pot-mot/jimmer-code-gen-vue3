<script setup lang="ts">
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import {computed} from "vue";
import IconAim from "@/components/icons/IconAim.vue";
import NameCommentEditor from "@/modelEditor/nameEditor/NameCommentEditor.vue";

const mappedSuperClass = defineModel<MappedSuperClassWithProperties>({required: true})

const {
    selectedIdSets,
    focusNode,
} = useModelEditor()

const isSelected = computed(() => {
    return selectedIdSets.value.mappedSuperClassIdSet.has(mappedSuperClass.value.id)
})

const handleFocus = () => {
    focusNode(mappedSuperClass.value.id)
}
</script>

<template>
    <div
        class="mapped-super-class-item"
        :class="{selected: isSelected}"
    >
        <NameCommentEditor v-model="mappedSuperClass"/>
        <button @click.stop="handleFocus">
            <IconAim/>
        </button>
    </div>
</template>
