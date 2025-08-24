const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!

const lineHeightComputeSpan = document.createElement('span');
lineHeightComputeSpan.innerText = 'a'
lineHeightComputeSpan.style.position = 'fixed'
lineHeightComputeSpan.style.top = "0"
lineHeightComputeSpan.style.left = "0"
lineHeightComputeSpan.style.overflow = 'hidden'
lineHeightComputeSpan.style.visibility = 'hidden'
lineHeightComputeSpan.style.pointerEvents = 'none'

document.body.appendChild(lineHeightComputeSpan)

export const getLineHeight = (style: CSSStyleDeclaration): number => {
    lineHeightComputeSpan.style.font = style.font
    lineHeightComputeSpan.style.lineHeight = style.lineHeight
    return lineHeightComputeSpan.offsetHeight
}

export const getTextLineSize = (text: string, targetEl: HTMLElement) => {
    const computedStyle = window.getComputedStyle(targetEl)
    context.font = computedStyle.font
    const metrics = context.measureText(text)
    const width = metrics.width
    const height = getLineHeight(computedStyle)

    return {width, height}
}

export const getTextBlockSize = (text: string, targetEl: HTMLElement) => {
    const computedStyle = window.getComputedStyle(targetEl)
    context.font = computedStyle.font
    const lines = text.split('\n')
    const width = Math.max(
        ...lines.map(line => context.measureText(line).width)
    )
    const height = getLineHeight(computedStyle) * lines.length

    return {width, height}
}
