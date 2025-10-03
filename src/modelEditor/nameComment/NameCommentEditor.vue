<script setup lang="ts">
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import {computed, ref, useTemplateRef} from "vue";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";

const model = defineModel<{
    name: string
    comment: string
}>({
    required: true
})

withDefaults(defineProps<{
    fontSize?: number
}>(), {
    fontSize: 16
})

const nameInput = useTemplateRef("nameInput")
const commentInput = useTemplateRef("commentInput")
const nameCommentEditorRef = useTemplateRef("nameCommentEditorRef")

useClickOutside(() => nameCommentEditorRef.value, () => {
    wrapperFocused.value = false
    nameFocused.value = false
    commentFocused.value = false
})

const focusNameInput = () => {
    nameInput.value?.$el.focus()
}
const focusCommentInput = () => {
    commentInput.value?.$el.focus()
}

const wrapperFocused = ref(false)
const nameFocused = ref(false)
const commentFocused = ref(false)
const handleNameBlur = () => {
    setTimeout(() => {
        nameFocused.value = false
        wrapperFocused.value = false
    }, 200)
}
const handleCommentBlur = () => {
    setTimeout(() => {
        commentFocused.value = false
        wrapperFocused.value = false
    }, 200)
}
const showComment = computed(() => model.value.comment.length > 0 || commentFocused.value || nameFocused.value)
</script>

<template>
    <span
        class="name-comment-editor"
        @click="wrapperFocused = true"
        ref="nameCommentEditorRef"
    >
        <span
            class="name"
            :class="{untouchable: !wrapperFocused}"
            @click.stop="focusNameInput"
        >
            <span
                v-if="!model.name && !nameFocused"
                class="no-name-warning"
            >
                [Empty Name]
            </span>
            <FitSizeLineInput
                ref="nameInput"
                class="noDrag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="model.name"
                @focus="nameFocused = true"
                @blur="handleNameBlur"
            />
        </span>
        <span
            v-if="showComment"
            class="comment"
            :class="{untouchable: !wrapperFocused}"
            @click.stop="focusCommentInput"
        >
            [<FitSizeLineInput
                ref="commentInput"
                class="noDrag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="model.comment"
                @focus="commentFocused = true"
                @blur="handleCommentBlur"
            />]
        </span>
    </span>
</template>

<style scoped>
.name-comment-editor {
    white-space: nowrap;
}

.name-comment-editor > .untouchable {
    pointer-events: none;
}

.name-comment-editor > .name > .no-name-warning {
    color: var(--warning-color);
}

.name-comment-editor > .comment,
.name-comment-editor > .comment > input {
    color: var(--comment-color);
}

.name-comment-editor input {
    border: none;
    background-color: transparent;
}

.name-comment-editor input:focus {
    background-color: var(--background-color);
}
</style>
