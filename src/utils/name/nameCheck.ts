/**
 * 检查字符串是否符合大驼峰命名法(UPPER_CAMEL)
 * @param name 待检查的字符串
 * @returns 是否符合大驼峰命名法
 */
export const checkUpperCamelName = (name: string) => {
    // 检查基本有效性
    if (!name || name.length === 0) return false

    // 必须以大写字母开头
    const firstChar = name.charAt(0)
    if (firstChar < 'A' || firstChar > 'Z') return false

    // 检查字符是否合法（字母、数字、下划线）
    for (let i = 0; i < name.length; i++) {
        const char = name.charAt(i)
        if (!((char >= 'A' && char <= 'Z') ||
            (char >= 'a' && char <= 'z') ||
            (char >= '0' && char <= '9') ||
            char === '_')) {
            return false
        }
    }

    return true
}

/**
 * 检查字符串是否符合小驼峰命名法(LOWER_CAMEL)
 * @param name 待检查的字符串
 * @returns 是否符合小驼峰命名法
 */
export const checkLowerCamelName = (name: string) => {
    // 检查基本有效性
    if (!name || name.length === 0) return false

    // 必须以小写字母开头
    const firstChar = name.charAt(0)
    if (firstChar < 'a' || firstChar > 'z') return false

    // 检查字符是否合法（字母、数字、下划线）
    for (let i = 0; i < name.length; i++) {
        const char = name.charAt(i)
        if (!((char >= 'A' && char <= 'Z') ||
            (char >= 'a' && char <= 'z') ||
            (char >= '0' && char <= '9') ||
            char === '_')) {
            return false
        }
    }

    return true
}
