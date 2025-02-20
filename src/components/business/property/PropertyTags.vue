<script setup lang="ts">
import {AssociationType} from "@/api/__generated/model/enums";
import {computed} from "vue";
import {GenEntityConfigView_TargetOf_properties} from "@/api/__generated/model/static";

const property = defineModel<GenEntityConfigView_TargetOf_properties>({
    required: true
})

const associationTypeToAnnotation = (associationType: AssociationType): string => {
    switch (associationType) {
        case "MANY_TO_MANY":
            return "@ManyToMany"
        case "MANY_TO_ONE":
            return "@ManyToOne"
        case "ONE_TO_MANY":
            return "@OneToMany"
        case "ONE_TO_ONE":
            return "@OneToOne"
    }
}

const propertyTags = computed<string[]>(() => {
    const data: Pick<GenEntityConfigView_TargetOf_properties,
        'idProperty' |
        'logicalDelete' |
        'keyProperty' | 'keyGroup' |
        'associationType' | 'mappedBy' | 'idView' | 'idViewTarget'
    > = property.value

    const tags: string[] = []

    if (data.idProperty) {
        tags.push("@Id")
    }

    if (data.logicalDelete) {
        tags.push("@LogicalDeleted")
    }

    if (data.keyProperty) {
        if (data.keyGroup !== undefined) {
            tags.push(`@Key(${data.keyGroup})`)
        } else {
            tags.push("@Key")
        }
    }

    if (data.associationType !== undefined) {
        if (data.idView) {
            if (data.idViewTarget !== undefined) {
                tags.push(`@IdView(${data.idViewTarget})`)
            } else {
                tags.push("@IdView")
            }
        } else {
            tags.push(associationTypeToAnnotation(data.associationType) +
                (data.mappedBy !== undefined ? `(mappedBy ${data.mappedBy})` : ''))
        }
    }

    return tags
})
</script>

<template>
    <div class="tags">
        <div v-for="tag in propertyTags" class="tag">{{ tag }}</div>
    </div>
</template>

<style scoped>
.tags {
    display: flex;
    gap: 0.5em;
    padding-bottom: 0.3em;
}

.tags > .tag {
    padding: 0.5em 1em;
    background-color: var(--el-bg-color);
    border: var(--el-border);
    border-radius: var(--el-border-radius-base);
    cursor: default;
    font-size: 0.6em;
    white-space: pre;
    color: var(--el-color-info)
}
</style>
