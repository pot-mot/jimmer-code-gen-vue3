<script setup lang="ts">
import {ref} from 'vue'
import IconClose from "@/components/icons/IconClose.vue";
import {LoadingTask} from "@/components/loading/LoadingTask.ts";

const tasks = ref<LoadingTask[]>([])

const props = withDefaults(defineProps<{
    enterDuration?: number,
    leaveDuration?: number,
}>(), {
    enterDuration: 300,
    leaveDuration: 300,
})

const emits = defineEmits<{
    (event: "stop", symbol: symbol): void,
    (event: "allStopped"): void
}>()

const start = (symbol: symbol, message: string) => {
    tasks.value.push({symbol, message})
}

const stop = (symbol: symbol, success: boolean) => {
    const item = tasks.value.find(t => t.symbol === symbol)
    if (!item) {
        throw new Error(`task ${symbol.description} not existed`)
    }
    if ("status" in item && item.status !== undefined) {
        throw new Error(`task ${symbol.description} already stopped`)
    }

    item.status = success ? 'success' : 'fail'
    emits("stop", symbol)

    if (tasks.value.filter(it => it.status !== undefined).length === tasks.value.length) {
        tasks.value = tasks.value.filter(it => it.status === 'fail')
        if (tasks.value.length === 0) {
            setTimeout(() => {
                if (tasks.value.length === 0) {
                    emits("allStopped")
                }
            }, props.leaveDuration)
        }
    }
}

const removeTask = (task: LoadingTask) => {
    tasks.value = tasks.value.filter(it => it !== task)
}

defineExpose({
    start,
    stop,
})
</script>

<template>
    <Transition name="loading-container">
        <div v-if="tasks.length > 0" class="loading-container">
            <div class="loading-task-list">
                <div
                    v-for="task in tasks"
                    :key="task.symbol"
                    class="loading-task"
                >
                    <span v-if="task.status === 'success'" class="success-tag">[SUCCESS]</span>
                    <span v-else-if="task.status === 'fail'" class="fail-tag">[FAIL]</span>
                    <span>{{ task.message }}</span>
                    <button v-if="task.status !== undefined" class="close-button" @click="removeTask(task)">
                        <IconClose/>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100 * var(--vh));
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    z-index: var(--loading-z-index);
    background: var(--loading-background-color);
}

.loading-task-list {
    max-height: calc(60 * var(--vh));
    overflow-y: auto;
}

.loading-task {
    padding: 0.5rem;
}

.success-tag {
    color: var(--success-color);
    margin-right: 0.5rem;
}

.fail-tag {
    color: var(--danger-color);
    margin-right: 0.5rem;
}

.close-button {
    margin-left: 0.5rem;
    vertical-align: middle;
}

.close-button:hover {
    --icon-color: var(--danger-color);
}

/* loading-container 渐变 */
.loading-container-enter-from,
.loading-container-leave-to {
    opacity: 0;
}

.loading-container-enter-active {
    transition: opacity v-bind(enterDuration + 'ms') ease-in-out;
}
.loading-container-leave-active {
    transition: opacity v-bind(leaveDuration + 'ms') ease-in-out;
}
</style>