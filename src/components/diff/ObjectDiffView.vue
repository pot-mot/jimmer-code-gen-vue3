<script setup lang="ts" generic="T extends Record<string, unknown>, U extends Record<string, unknown> = T">
import ArrayDiffView from "@/components/diff/ArrayDiffView.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";

defineProps<{
    diff: ObjectDiff<T, U>,
}>()

defineSlots<{

}>()
</script>

<template>
    <div class="object-diff-view">
        <!-- 属性添加 -->
        <div v-if="diff.added" class="diff-section">
            <div
                v-for="(item, key) in diff.added"
                :key="'added' + String(key)"
                class="diff-item added"
            >
                <template v-if="item !== undefined">
                    <div class="item-flag no-drag">+</div>
                    <div class="property-name no-drag">
                        {{ item.propertyName }}
                    </div>
                    <div class="property-value no-drag">{{ item.value }}</div>
                </template>
            </div>
        </div>

        <div v-if="diff.updated" class="diff-section">
            <div
                v-for="(item, key) in diff.updated"
                :key="'updated' + String(key)"
            >
                <template v-if="item !== undefined">
                    <CollapseDetail trigger-position="left" :disabled="item.diff === undefined" :model-value="true">
                        <template #head>
                            <div
                                v-if="item.diff === undefined"
                                class="diff-item updated"
                            >
                                <div class="property-name no-drag">
                                    {{ item.propertyName }}
                                </div>
                                <div class="item-change no-drag">
                                    <div class="change-tag">from</div>
                                    <div class="prev-value">{{ item.prevValue }}</div>
                                    <div class="change-tag">to</div>
                                    <div class="next-value">{{ item.nextValue }}</div>
                                </div>
                            </div>
                            <div
                                v-else
                                class="diff-item updated"
                            >
                                <div class="property-name">
                                    {{ item.propertyName }}
                                </div>
                            </div>
                        </template>

                        <template #body v-if="item.diff !== undefined">
                            <div class="nested-diff">
                                <ObjectDiffView
                                    v-if="item.diff.type === 'object'"
                                    :diff="item.diff as ObjectDiff<any>"
                                />
                                <ArrayDiffView
                                    v-else-if="item.diff.type === 'array'"
                                    :diff="item.diff"
                                />
                                <div
                                    v-else-if="item.diff.type === 'circular reference'"
                                >
                                    [Circular]
                                </div>
                            </div>
                        </template>
                    </CollapseDetail>
                </template>
            </div>
        </div>

        <!-- 属性删除 -->
        <div v-if="diff.deleted" class="diff-section">
            <div
                v-for="(item, key) in diff.deleted"
                :key="'deleted' + String(key)"
                class="diff-item deleted"
            >
                <template v-if="item !== undefined">
                    <div class="item-flag no-drag">-</div>
                    <div class="property-name no-drag">
                        {{ item.propertyName }}
                    </div>
                    <div class="property-value no-drag">{{ item.value }}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.diff-item {
    display: flex;
    gap: 0.5rem;
}

.item-change {
    display: flex;
    gap: 0.5rem;
}

.nested-diff {
    padding-left: 0.5rem;
}

.change-tag {
    flex-shrink: 0;
    white-space: nowrap;
    color: var(--comment-color);
}

.diff-item.added {
    color: var(--success-color);
    background-color: var(--success-color-opacity-background);
}

.diff-item.deleted {
    color: var(--danger-color);
    background-color: var(--danger-color-opacity-background);
}

.diff-item.updated {
    color: var(--warning-color);
    background-color: var(--warning-color-opacity-background);
}
</style>