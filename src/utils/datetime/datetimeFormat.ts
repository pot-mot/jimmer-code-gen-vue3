const numberReg = /^\d+$/

export const isValidDate = (date: Date) => {
    return !isNaN(date.getTime())
}

export const formatDatetimeToLocal = (datetime: string | number | null | undefined) => {
    if (!datetime) return ""
    try {
        if (typeof datetime === "string" && numberReg.test(datetime)) {
            datetime = parseInt(datetime)
        }
        const date = new Date(datetime)
        if (!isValidDate(date)) return datetime
        return date.toLocaleString()
    } catch (e) {
        return datetime
    }
}