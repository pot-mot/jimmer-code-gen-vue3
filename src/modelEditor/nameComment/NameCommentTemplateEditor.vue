<script setup lang="ts">
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import {computed, nextTick, onMounted, ref, useTemplateRef} from "vue";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconCode from "@/components/icons/IconCode.vue";

const model = defineModel<{
    name: string
    nameTemplate: string
    useNameTemplate: boolean
    comment: string
    commentTemplate: string,
    useCommentTemplate: boolean
}>({
    required: true
})

const nameModel = computed({
    get: () => {
        if (model.value.useNameTemplate && nameFocused.value) return model.value.nameTemplate
        return model.value.name
    },
    set: newValue => {
        if (model.value.useNameTemplate) model.value.nameTemplate = newValue
        else model.value.name = newValue
    }
})

const toggleNameTemplate = async () => {
    model.value.useNameTemplate = !model.value.useNameTemplate
    await nextTick()
    setTimeout(() => {
        focusNameInput()
    }, props.blurDelay)
}

const commentModel = computed({
    get: () => {
        if (model.value.useCommentTemplate && commentFocused.value) return model.value.commentTemplate
        return model.value.comment
    },
    set: newValue => {
        if (model.value.useCommentTemplate) model.value.commentTemplate = newValue
        else model.value.comment = newValue
    }
})

const toggleCommentTemplate = async () => {
    model.value.useCommentTemplate = !model.value.useCommentTemplate
    await nextTick()
    setTimeout(() => {
        focusCommentInput()
    }, props.blurDelay)
}

const props = withDefaults(defineProps<{
    autoFocus?: boolean
    fontSize?: number
    blurDelay?: number
}>(), {
    fontSize: 16,
    blurDelay: 200
})

const emits = defineEmits<{
    (event: "change"): void
    (event: "blur"): void
}>()

const nameInput = useTemplateRef("nameInput")
const commentInput = useTemplateRef("commentInput")
const nameCommentEditorRef = useTemplateRef("nameCommentEditorRef")

const wrapperFocused = ref(false)
const nameFocused = ref(false)
const commentFocused = ref(false)

useClickOutside(() => nameCommentEditorRef.value, (e) => {
    wrapperFocused.value = false
    nameFocused.value = false
    commentFocused.value = false
}, {capture: true})

const focusNameInput = () => {
    wrapperFocused.value = true
    nameInput.value?.$el.focus()
}
const focusCommentInput = () => {
    wrapperFocused.value = true
    commentInput.value?.$el.focus()
}

const handleNameFocus = () => {
    nameFocused.value = true
}
const handleNameBlur = () => {
    setTimeout(() => {
        nameFocused.value = false
        if (!commentFocused.value) {
            wrapperFocused.value = false
            emits("blur")
        }
    }, props.blurDelay)
}
const handleCommentFocus = () => {
    commentFocused.value = true
}
const handleCommentBlur = () => {
    setTimeout(() => {
        commentFocused.value = false
        if (!nameFocused.value) {
            wrapperFocused.value = false
            emits("blur")
        }
    }, props.blurDelay)
}

onMounted(async () => {
    if (props.autoFocus) {
        await nextTick()
        focusNameInput()
    }
})

const showComment = computed(() => model.value.comment.length > 0 || nameFocused.value || commentFocused.value)
</script>

<template>
    <span
        class="name-comment-editor"
        @click="wrapperFocused = true"
        ref="nameCommentEditorRef"
    >
        <span
            class="name"
            :class="{untouchable: !wrapperFocused && !nameFocused}"
            @click.stop="focusNameInput"
        >
            <span
                v-if="!model.name && !nameFocused"
                class="empty-name"
            >
                [Please Enter Name]
            </span>
            <FitSizeLineInput
                ref="nameInput"
                class="no-drag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="nameModel"
                @change="emits('change')"
                @focus="handleNameFocus"
                @blur="handleNameBlur"
            /><span
                v-show="nameFocused"
                class="template-button"
                @click.stop.prevent="toggleNameTemplate"
                :class="{enabled: model.useNameTemplate}"
            >
                <IconCode/>
            </span>
        </span>
        <span
            v-if="showComment"
            class="comment"
            :class="{untouchable: !wrapperFocused && !commentFocused}"
            @click.stop="focusCommentInput"
        >
            [<FitSizeLineInput
                ref="commentInput"
                class="no-drag"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="commentModel"
                @change="emits('change')"
                @focus="handleCommentFocus"
                @blur="handleCommentBlur"
            /><span
                v-show="commentFocused"
                class="template-button"
                @click.stop.prevent="toggleCommentTemplate"
                :class="{enabled: model.useCommentTemplate}"
            >
                <IconCode/>
            </span>]
        </span>
    </span>
</template>

<style scoped>
.name-comment-editor {
    cursor: default;
    white-space: nowrap;
}

.name-comment-editor > .untouchable {
    pointer-events: none;
}

.name-comment-editor > .name > .empty-name {
    cursor: text;
    font-size: 0.8em;
    color: var(--warning-color);
}

.name-comment-editor > .comment,
.name-comment-editor > .comment > input {
    color: var(--comment-color);
}

.name-comment-editor input {
    cursor: text;
    border: none;
    background-color: transparent;
}

.name-comment-editor input:focus {
    background-color: var(--background-color);
}

.template-button {
    --icon-color: var(--comment-color);
    --icon-size: 0.8rem;
    padding: 0 0.1rem;
    cursor: pointer;
}

.template-button.enabled {
    --icon-color: var(--success-color);
}

.template-button:hover {
    --icon-color: var(--text-color);
}
</style>
