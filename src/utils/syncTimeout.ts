export const syncTimeout = async (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('')
        }, timeout)
    });
}
