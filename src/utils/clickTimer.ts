/**
 * 处理双击时不触发单击
 *
 * @param clickFn 单击回调函数
 * @param dblClickFn 双击回调函数
 * @param timeout 单击触发延迟
 */
export const processClickFunction = (
    clickFn: any,
    dblClickFn: any,
    timeout: number = 150
) => {
    let timer: NodeJS.Timeout

    const click = (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(
            () => {
                clickFn(...args)
            },
            timeout
        )
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