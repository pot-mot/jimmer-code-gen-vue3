export const createStore = <T extends Record<string, any>>(factory: () => T): () => Readonly<T> => {
    let storeInstance: Readonly<T> | undefined
    let isCreating = false

    return (): Readonly<T> => {
        if (!storeInstance) {
            if (isCreating) {
                throw new Error('Detected recursive call during store initialization')
            }

            try {
                isCreating = true
                const result = factory()
                storeInstance = Object.freeze(result)
            } finally {
                isCreating = false
            }
        }
        return storeInstance
    }
}