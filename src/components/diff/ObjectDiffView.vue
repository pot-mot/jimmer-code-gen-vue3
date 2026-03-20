<script
    setup
    lang="ts"
    generic="T extends Record<string, unknown>, U extends Record<string, unknown> = T"
>
import ArrayDiffView from '@/components/diff/ArrayDiffView.vue';
import CollapseDetail from '@/components/collapse/CollapseDetail.vue';
import type {ObjectDiff} from '@potmot/diff';
import {computed} from 'vue';
import type {
    PropertyAddedDiffItem,
    PropertyUpdatedDiffItem,
} from '@potmot/diff/dist/type/DiffItem.d.ts';

const props = defineProps<{
    diff: ObjectDiff<T, U>;
}>();

defineSlots<{}>();

const updated = computed<PropertyUpdatedDiffItem<T, U>[]>(() => {
    return Object.values(props.diff.updated ?? {});
});

const added = computed<PropertyAddedDiffItem<U>[]>(() => {
    return Object.values(props.diff.added ?? {});
});

const deleted = computed<PropertyAddedDiffItem<T>[]>(() => {
    return Object.values(props.diff.deleted ?? {});
});
</script>

<template>
    <div class="object-diff-view">
        <!-- 属性添加 -->
        <div
            v-if="added.length > 0"
            class="diff-section"
        >
            <div
                v-for="item in added"
                :key="'added' + String(item.propertyName)"
                class="diff-item added"
            >
                <div class="item-flag no-drag">+</div>
                <div class="property-name no-drag">
                    {{ item.propertyName }}
                </div>
                <div class="property-value no-drag">{{ item.value }}</div>
            </div>
        </div>

        <div
            v-if="updated.length > 0"
            class="diff-section"
        >
            <div
                v-for="item in updated"
                :key="'updated' + String(item.propertyName)"
            >
                <CollapseDetail
                    trigger-position="left"
                    :disabled="item.diff === undefined"
                    :model-value="true"
                >
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

                    <template
                        #body
                        v-if="item.diff"
                    >
                        <div class="nested-diff">
                            <ObjectDiffView
                                v-if="item.diff.type === 'object'"
                                :diff="item.diff as ObjectDiff<any>"
                            />
                            <ArrayDiffView
                                v-else-if="item.diff.type === 'array'"
                                :diff="item.diff"
                            />
                            <div v-else-if="item.diff.type === 'circular reference'">
                                [Circular]
                            </div>
                        </div>
                    </template>
                </CollapseDetail>
            </div>
        </div>

        <!-- 属性删除 -->
        <div
            v-if="deleted.length > 0"
            class="diff-section"
        >
            <div
                v-for="item in deleted"
                :key="'deleted' + String(item.propertyName)"
                class="diff-item deleted"
            >
                <div class="item-flag no-drag">-</div>
                <div class="property-name no-drag">
                    {{ item.propertyName }}
                </div>
                <div class="property-value no-drag">{{ item.value }}</div>
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
