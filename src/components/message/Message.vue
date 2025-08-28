<script setup lang="ts">
import {ref} from "vue";
import IconClose from "@/components/icons/IconClose.vue";
import {
    type MessageContent,
    type MessageItem,
    messageOpenDefaultOptions,
    type MessageOpenOptions,
} from "@/components/message/MessageItem.ts";

const props = withDefaults(defineProps<{
    timeout?: number,
    enterDuration?: number,
    leaveDuration?: number,
}>(), {
    timeout: 3000,
    enterDuration: 500,
    leaveDuration: 1000,
})

const emits = defineEmits<{
    (event: "close", index: number): void,
    (event: "closeAll"): void
}>()

let messageItemIdIncrement = 0

const messageItems = ref<MessageItem[]>([])

const setMessageItemTimeout = (messageItem: MessageItem) => {
    if (messageItem.timeout !== undefined) {
        clearTimeout(messageItem.timeout)
    }

    messageItem.timeout = setTimeout(() => {
        const index = messageItems.value.findIndex(it => it.id === messageItem.id)
        if (index === -1) return
        messageItems.value.splice(index, 1)
        setTimeout(() => {
            emits("close", index)
        }, props.leaveDuration)
    }, props.timeout + props.enterDuration)
}

const open = (
    content: MessageContent,
    options?: Partial<MessageOpenOptions>
) => {
    const {
        type,
        canClose,
        grouping,
    } = Object.assign({}, messageOpenDefaultOptions, options)

    if (grouping) {
        const existingItem = messageItems.value.find(item => {
            if (typeof content === 'string' && typeof item.content === 'string') {
                return content === item.content
            }
            return false
        })

        if (existingItem) {
            existingItem.repeatCount++
            setMessageItemTimeout(existingItem)
            return
        }
    }

    const messageItem: MessageItem = {id: ++messageItemIdIncrement, content, type, canClose, repeatCount: 1}
    setMessageItemTimeout(messageItem)
    messageItems.value.push(messageItem)
}

const handleMouseEnter = (messageItem: MessageItem) => {
    clearTimeout(messageItem.timeout)
}

const handleMouseLeave = (messageItem: MessageItem) => {
    setMessageItemTimeout(messageItem)
}

const close = (index: number) => {
    const removedMessages = messageItems.value.splice(index, 1)
    for (const message of removedMessages) {
        clearTimeout(message.timeout)
    }
    setTimeout(() => {
        emits("close", index)
    }, props.leaveDuration)
}

const handleAfterLeave = () => {
    if (messageItems.value.length === 0) {
        setTimeout(() => {
            if (messageItems.value.length === 0) {
                emits("closeAll")
            }
        }, props.leaveDuration)
    }
}

defineExpose({
    open
})
</script>

<template>
    <div class="message-container">
        <TransitionGroup
            tag="div"
            name="messages"
            style="position: relative;"
            :duration="{enter: enterDuration, leave: leaveDuration}"
            @after-leave="handleAfterLeave"
        >
            <div
                v-for="(item, index) in messageItems"
                :key="item.id"
                class="message-wrapper"
            >
                <div
                    class="message" :class="item.type"
                    @mouseenter="handleMouseEnter(item)"
                    @mouseleave="handleMouseLeave(item)"
                >
                    <div class="message-content">
                        <Component v-if="typeof item.content !== 'string'" :is="item.content"/>
                        <div v-else>{{ item.content }}</div>
                    </div>

                    <div v-if="item.canClose" class="close-icon" @click="close(index)">
                        <IconClose/>
                    </div>
                    <div v-if="item.repeatCount > 1" class="repeat-count">
                        {{ item.repeatCount }}
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.message-container {
    position: absolute;
    top: 1.5rem;
    width: 100%;
    margin: auto;
    pointer-events: none;
    z-index: var(--message-z-index);
}

.message-wrapper {
    width: 100%;
    margin-bottom: 1rem;
}

.message {
    position: relative;
    display: flex;
    height: fit-content;
    width: fit-content;
    padding: 0.2rem 1rem;
    margin: auto;
    border: var(--border);
    border-radius: var(--border-radius);
    pointer-events: all;
    max-width: 80%;
    overflow: visible;
}

.message-content {
    max-width: 100%;
    overflow: auto;
    height: fit-content;
    width: fit-content;
    white-space: pre;
    font-size: 1rem;
    line-height: 1.5rem;
}

.message.primary {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background-color: var(--primary-color-opacity-background);
}

.message.success {
    color: var(--success-color);
    border-color: var(--success-color);
    background-color: var(--success-color-opacity-background);
}

.message.error {
    color: var(--danger-color);
    border-color: var(--danger-color);
    background-color: var(--danger-color-opacity-background);
}

.message.warning {
    color: var(--warning-color);
    border-color: var(--warning-color);
    background-color: var(--warning-color-opacity-background);
}

.message.info {
    color: var(--info-color);
    border-color: var(--info-color);
    background-color: var(--info-color-opacity-background);
}

.repeat-count {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    font-size: 0.75rem;
    margin-left: 0.5rem;
    background: var(--background-color);
    border: var(--border);
    border-color: inherit;
    padding: 0.125rem;
    border-radius: 0.25rem;
}

.close-icon {
    height: 1.5rem;
    line-height: 1.4rem;
    margin-left: 0.5rem;
    cursor: pointer;
    --icon-color: var(--info-color);
}

.close-icon:hover {
    --icon-color: var(--danger-color);
}

/* messages 过渡动画 */
.messages-enter-from,
.messages-leave-to {
    opacity: 0;
    transform: translateY(-200%);
}

.messages-enter-active {
    transition: opacity v-bind(enterDuration+ 'ms') ease, transform v-bind(enterDuration+ 'ms') ease;
}

.messages-move,
.messages-leave-active {
    transition: opacity v-bind(leaveDuration+ 'ms') ease, transform v-bind(enterDuration+ 'ms') linear;
    pointer-events: none;
}

.messages-leave-active {
    position: absolute;
}
</style>
