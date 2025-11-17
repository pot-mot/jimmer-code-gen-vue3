import {createApp} from "vue";
import ProcessLoading from "@/components/loading/ProcessLoading.vue";

type LoadingInstance = InstanceType<typeof ProcessLoading>
let newInstance: LoadingInstance | null = null

export const startLoading = (
    message: string
) => {
    const symbol = Symbol(message)

    if (newInstance === null) {
        const el = document.createElement("div")
        const app = createApp(ProcessLoading, {
            onAllStopped: () => {
                app.unmount()
                el.remove()
                newInstance = null
            }
        })
        newInstance = app.mount(el) as LoadingInstance;
        document.body.appendChild(el)
        newInstance.start(symbol, message)
    } else {
        newInstance.start(symbol, message)
    }

    return {
        symbol,
        stop: (success: boolean = true) => {
            stopLoading(symbol, success)
        },
    }
}

export const stopLoading = (symbol: symbol, success: boolean) => {
    if (newInstance !== null) {
        newInstance.stop(symbol, success);
    }
}

export const withLoading = async <T> (message: string, fn: () => Promise<T>) => {
    const {stop} = startLoading(message)
    try {
        const result = await fn()
        stop(true)
        return result
    } catch (e) {
        console.error(e)
        stop(false)
        throw e
    }
}