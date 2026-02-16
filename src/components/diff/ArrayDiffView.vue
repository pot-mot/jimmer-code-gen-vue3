<script setup lang="ts" generic="T">
import ObjectDiffView from "@/components/diff/ObjectDiffView.vue";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import type {ArrayDiff} from "@potmot/diff/dist/type/DiffItem.d.ts";

defineProps<{
    diff: ArrayDiff<T>,
    showEquals?: boolean
}>()

defineSlots<{

}>()
</script>

<template>
    <div class="array-diff-view">
        <!-- 数组元素添加 -->
        <div v-if="diff.added && diff.added.length > 0" class="diff-section">
            <div
                v-for="(item, index) in diff.added"
                :key="'added-' + index"
                class="diff-item added"
            >
                <div class="item-flag no-drag">+</div>
                <div class="item-index no-drag">[{{ item.nextIndex }}]</div>
                <div class="item-content no-drag">{{ item.data }}</div>
            </div>
        </div>

        <!-- 数组元素更新 -->
        <div v-if="diff.updated && diff.updated.length > 0" class="diff-section">
            <div
                v-for="(item, index) in diff.updated"
                :key="'updated-' + index"
            >
                <CollapseDetail trigger-position="left" :disabled="item.diff === undefined" :model-value="true">
                    <template #head>
                        <div
                            v-if="item.diff === undefined"
                            class="diff-item updated"
                        >
                            <div class="item-index no-drag">[{{ item.nextIndex }}]</div>
                            <div class="item-change no-drag">
                                <div class="change-tag">from</div>
                                <div class="item-content">{{ item.prevData }}</div>
                                <div class="change-tag">to</div>
                                <div class="item-content">{{ item.nextData }}</div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="diff-item updated"
                        >
                            <div class="item-index no-drag">[{{ item.nextIndex }}]</div>
                        </div>
                    </template>

                    <template #body v-if="item.diff !== undefined">
                        <div class="nested-diff">
                            <ObjectDiffView
                                v-if="item.diff.type === 'object'"
                                :diff="item.diff"
                            />
                            <ArrayDiffView
                                v-else-if="item.diff.type === 'array'"
                                :diff="item.diff as ArrayDiff<any>"
                            />
                            <div
                                v-else-if="item.diff.type === 'circular reference'"
                            >
                                [Circular]
                            </div>
                        </div>
                    </template>
                </CollapseDetail>
            </div>
        </div>

        <!-- 数组元素删除 -->
        <div v-if="diff.deleted && diff.deleted.length > 0" class="diff-section">
            <div
                v-for="(item, index) in diff.deleted"
                :key="'deleted-' + index"
                class="diff-item deleted"
            >
                <div class="item-flag no-drag">-</div>
                <div class="item-index no-drag">[{{ item.prevIndex }}]</div>
                <div class="item-content no-drag">{{ item.data }}</div>
            </div>
        </div>

        <!-- 数组元素移动 -->
        <div v-if="diff.moved && diff.moved.length > 0" class="diff-section">
            <div
                v-for="(item, index) in diff.moved"
                :key="'moved-' + index"
                class="diff-item moved"
            >
                <div class="item-index no-drag">[{{ item.prevIndex }} -> {{ item.nextIndex }}]</div>
                <div class="item-content no-drag">{{ item.data }}</div>
            </div>
        </div>

        <!-- 相同元素（仅用于参考，通常不需要显示） -->
        <div v-if="diff.equals && diff.equals.length > 0 && showEquals" class="diff-section">
            <div
                v-for="(item, index) in diff.equals"
                :key="'equals-' + index"
                class="diff-item equals"
            >
                <div class="item-flag no-drag">=</div>
                <div class="item-index no-drag">[{{ item.index }}]</div>
                <div class="item-content no-drag">{{ item.data }}</div>
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

.item-index,
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

.diff-item.updated,
.diff-item.moved {
    color: var(--warning-color);
    background-color: var(--warning-color-opacity-background);
}
</style>