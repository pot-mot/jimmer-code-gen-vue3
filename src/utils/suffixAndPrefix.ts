/**
 * 从给定的字符串中移除前缀字符串
 * @param str 要处理的字符串
 * @param prefixes 要移除的前缀列表
 * @param separator 分隔符
 * @returns 移除前缀后的字符串
 */
export const removePrefixes = (
    str: string,
    prefixes: string[],
    separator: string = "_"
): string => {
    let result = str;

    for (const prefix of prefixes) {
        if (result.startsWith(prefix)) {
            result = result.substring(prefix.length);
            if (separator.length > 0 && result.startsWith(separator)) {
                result = result.substring(separator.length);
            }
            break;
        }
    }

    return result;
}

/**
 * 从给定的字符串中移除后缀字符串
 * @param str 要处理的字符串
 * @param suffixes 要移除的后缀列表
 * @param separator 分隔符
 * @returns 移除后缀后的字符串
 */
export const removeSuffixes = (
    str: string,
    suffixes: string[],
    separator: string = "_"
): string => {
    let result = str;

    for (const suffix of suffixes) {
        if (result.endsWith(suffix)) {
            result = result.substring(0, result.length - suffix.length);
            if (separator.length > 0 && result.endsWith(separator)) {
                result = result.substring(0, result.length - separator.length);
            }
            break;
        }
    }

    return result;
}

export const removePrefixesAndSuffixes = (
    str: string,
    prefixes: string[],
    suffixes: string[],
    separator: string = "_"
) => {
    let temp = removePrefixes(str, prefixes, separator)
    temp = removeSuffixes(temp, suffixes, separator)
    return temp
}

export const removeSplitPrefixAndSuffix = (
    str: string,
    prefixes: string,
    suffixes: string,
    separator: string = "_"
) => {
    let temp = removePrefixes(str, prefixes.split(",").map(it => it.trim()), separator)
    temp = removeSuffixes(temp, suffixes.split(",").map(it => it.trim()), separator)
    return temp
}
