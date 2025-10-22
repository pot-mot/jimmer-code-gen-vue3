import {ref, watch} from "vue";

export const useNameCommentTemplateModel = (
    getter: () => {
        nameTemplate: string,
        commentTemplate: string,
    },
) => {
    const initValue = getter()
    const nameComment = ref({
        name: initValue.nameTemplate,
        comment: initValue.commentTemplate,
    })

    watch(getter, (value) => {
        nameComment.value = {
            name: value.nameTemplate,
            comment: value.commentTemplate,
        }
    })

    watch(() => nameComment.value.name, (value) => {
        getter().nameTemplate = value
    })
    watch(() => nameComment.value.comment, (value) => {
        getter().commentTemplate = value
    })

    watch(() => getter().nameTemplate, (value) => {
        nameComment.value.name = value
    })
    watch(() => getter().commentTemplate, (value) => {
        nameComment.value.comment = value
    })

    return nameComment
}