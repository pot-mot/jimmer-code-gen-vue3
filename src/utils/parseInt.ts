export const parseIntForAny = (value: any, defaultValue: number = 0) => {
    let temp = value
    if (!temp) {
        temp = 0
    } else if (typeof temp == "string") {
        try {
            temp = parseInt(temp)
        } catch (e) {
            temp = 0
        }
    } else {
        temp = 0
    }

    return temp
}
