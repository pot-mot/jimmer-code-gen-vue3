<script setup lang="ts">
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import {computed, ref, useTemplateRef} from "vue";

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

const commentInput = useTemplateRef("commentInput")

const focusCommentInput = () => {
    commentInput.value?.$el.focus()
}

const nameFocused = ref(false)
const commentFocused = ref(false)
const handleInputBlur = () => {
    setTimeout(() => {
        nameFocused.value = false
    }, 500)
}
const showComment = computed(() => model.value.comment.length > 0 || commentFocused.value || nameFocused.value)
</script>

<template>
    <span>
        <span class="name">
            <FitSizeLineInput
                class="noDrag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="model.name"
                @focus="nameFocused = true"
                @blur="handleInputBlur"
            />
        </span>
        <span class="comment" v-if="showComment" @click="focusCommentInput">
            /*
            <FitSizeLineInput
                ref="commentInput"
                class="noDrag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="model.comment"
                @focus="commentFocused = true"
                @blur="commentFocused = false"
            />
            */
        </span>
    </span>
</template>

<style scoped>
input {
    border: none;
    background-color: transparent;
}

.comment {
    color: var(--comment-color)
}

.comment > input {
    color: var(--comment-color);
}

input:focus {
    background-color: var(--background-color);
}
</style>
