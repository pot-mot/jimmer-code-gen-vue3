export const firstCaseToLower = (name: string): string => {
    if (name.length < 1) return name
    return name.charAt(0).toLowerCase() + name.slice(1)
}

export const firstCaseToUpper = (name: string): string => {
    if (name.length < 1) return name
    return name.charAt(0).toUpperCase() + name.slice(1)
}
