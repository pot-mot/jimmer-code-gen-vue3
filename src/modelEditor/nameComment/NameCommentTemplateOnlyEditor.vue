<script setup lang="ts">
import FitSizeLineInput from "@/components/input/FitSizeLineInput.vue";
import {computed, nextTick, onMounted, ref, useTemplateRef} from "vue";
import {useClickOutside} from "@/components/list/selectableList/useClickOutside.ts";

const model = defineModel<{
    nameTemplate: string
    commentTemplate: string
}>({
    required: true
})

const nameModel = computed({
    get: () => {
        if (nameFocused.value) return model.value.nameTemplate
        return props.name
    },
    set: newValue => {
        model.value.nameTemplate = newValue
    }
})

const commentModel = computed({
    get: () => {
        if (commentFocused.value) return model.value.commentTemplate
        return props.comment
    },
    set: newValue => {
        model.value.commentTemplate = newValue
    }
})

const props = withDefaults(defineProps<{
    name: string
    comment: string

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

const editorRef = useTemplateRef("editorRef")
const nameInput = useTemplateRef("nameInput")
const commentInput = useTemplateRef("commentInput")
const nameSpan = useTemplateRef("nameSpan")
const commentSpan = useTemplateRef("commentSpan")

const editorFocused = ref(false)
const nameFocused = ref(false)
const commentFocused = ref(false)

useClickOutside(() => editorRef.value, () => {
    editorFocused.value = false
    nameFocused.value = false
    commentFocused.value = false
})

const focusNameInput = () => {
    editorFocused.value = true
    nameFocused.value = true
    commentFocused.value = false
    nextTick(() => {
        nameInput.value?.$el.focus()
    })
}
const focusCommentInput = () => {
    editorFocused.value = true
    nameFocused.value = false
    commentFocused.value = true
    nextTick(() => {
        commentInput.value?.$el.focus()
    })
}

const handleNameFocus = () => {
    editorFocused.value = true
    nameFocused.value = true
}
const handleNameBlur = () => {
    window.setTimeout(() => {
        nameFocused.value = false
        if (!commentFocused.value) {
            editorFocused.value = false
            emits("blur")
        }
    }, props.blurDelay)
}
const handleCommentFocus = () => {
    editorFocused.value = true
    commentFocused.value = true
}
const handleCommentBlur = () => {
    window.setTimeout(() => {
        commentFocused.value = false
        if (!nameFocused.value) {
            editorFocused.value = false
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

const showComment = computed(() => props.comment.length > 0 || nameFocused.value || commentFocused.value)

const handleDoubleClick = (event: MouseEvent) => {
    if (editorFocused.value || nameFocused.value || commentFocused.value) return

    // 判断点击位置是否在name区域
    if (event.target === nameSpan.value) {
        focusNameInput();
    }
    // 判断点击位置是否在comment区域
    else if (event.target === commentSpan.value) {
        focusCommentInput();
    }
    // 如果点击在其他区域，可以选择默认聚焦nameInput
    else {
        focusNameInput();
    }
}
</script>

<template>
    <span
        class="name-comment-editor"
        @dblclick.stop="handleDoubleClick"
        ref="editorRef"
    >
        <span
            ref="nameSpan"
            class="name"
        >
            <span
                v-if="!props.name && !nameFocused"
                class="empty-name"
                :class="{untouchable: !editorFocused && !nameFocused}"
            >
                [Please Enter Name]
            </span>
            <FitSizeLineInput
                ref="nameInput"
                class="no-drag"
                :class="{untouchable: !editorFocused && !nameFocused}"
                :padding="{top: 4, bottom: 4, left: 0, right: 0}"
                :line-height="fontSize"
                :font-size="fontSize"
                v-model="nameModel"
                @change="emits('change')"
                @focus="handleNameFocus"
                @blur="handleNameBlur"
            />
        </span>
        <span
            v-if="showComment"
            ref="commentSpan"
            class="comment"
        >
            [<FitSizeLineInput
            ref="commentInput"
            class="no-drag"
            :class="{untouchable: !editorFocused && !commentFocused}"
            :padding="{top: 4, bottom: 4, left: 0, right: 0}"
            :line-height="fontSize"
            :font-size="fontSize"
            v-model="commentModel"
            @change="emits('change')"
            @focus="handleCommentFocus"
            @blur="handleCommentBlur"
        />]
        </span>
    </span>
</template>

<style scoped>
.name-comment-editor {
    cursor: default;
    white-space: nowrap;
}

.name-comment-editor .untouchable {
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
</style>
