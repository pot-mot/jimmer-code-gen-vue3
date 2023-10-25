export const processClickFunction = (
    clickFn: any,
    dblClickFn: any,
    timeout: number = 200
) => {
    let timer: number

    const click = (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            clickFn(...args)
        }, timeout)
    }

    const dblClick = async (...args: any[]) => {
        clearTimeout(timer)
        return await dblClickFn(...args)
    }

    return {
        click,
        dblClick
    }
}