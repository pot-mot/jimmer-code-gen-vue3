const regExpMatch = /^\/(.*)\/([gimuy]*)$/

export const parseRegExp = (regExpStr: string): RegExp => {
    // 匹配 /pattern/flags 格式
    const match = regExpStr.match(regExpMatch)
    if (match) {
        const [, pattern, flags] = match
        if (pattern !== undefined) return new RegExp(pattern, flags)
    }
    // 如果不是标准格式，当作普通字符串处理
    return new RegExp(regExpStr)
}

export const validateRegExp = (pattern: string): boolean => {
    try {
        parseRegExp(pattern)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}