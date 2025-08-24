export const createStore = <T>(factory: () => T): () => T => {
    let storeInstance: T | undefined
    let isCreating = false

    return (): T => {
        if (!storeInstance) {
            if (isCreating) {
                throw new Error('Detected recursive call during store initialization')
            }

            try {
                isCreating = true
                storeInstance = factory()
            } finally {
                isCreating = false
            }
        }
        return storeInstance
    }
}