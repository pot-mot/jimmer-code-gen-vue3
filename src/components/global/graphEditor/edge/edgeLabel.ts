export const getEdgeLabelElements = (id: string): NodeListOf<SVGGElement> | undefined => {
    const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${id}"]`) as SVGGElement | undefined
    return edgeSvg?.querySelectorAll('.x6-edge-label') as NodeListOf<SVGGElement>
}
