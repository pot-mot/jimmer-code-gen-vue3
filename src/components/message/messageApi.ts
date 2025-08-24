import {createApp} from "vue";
import Message from "@/components/message/Message.vue";
import type {MessageContent, MessageOpenOptions} from "@/components/message/MessageItem.ts";

type MessageInstance = InstanceType<typeof Message>
let newInstance: MessageInstance | null = null

export const sendMessage = (
    message: MessageContent,
    options?: Partial<MessageOpenOptions>,
) => {
    if (newInstance === null) {
        const el = document.createElement("div");
        const app = createApp(Message, {
            onCloseAll: () => {
                app.unmount();
                el.remove();
                newInstance = null;
            }
        })
        newInstance = app.mount(el) as MessageInstance;
        document.body.appendChild(el);
        newInstance.open(message, options);
    } else {
        newInstance.open(message, options);
    }
}
