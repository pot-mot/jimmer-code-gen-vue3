export type FullPadding = {
    left: number,
    top: number,
    right: number,
    bottom: number,
}
export type PaddingData = number | FullPadding

export const calculatePadding = (padding: PaddingData): FullPadding => {
    return typeof padding === "number"
        ? {
            left: padding,
            top: padding,
            right: padding,
            bottom: padding,
        }
        : padding
}
