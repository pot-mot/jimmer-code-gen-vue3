import {Graph} from "@antv/x6";
import {GenModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

const exportStyleSheet = () => `
:root {
    --background-color: ${(document.querySelector(":root") as HTMLElement | undefined)?.computedStyleMap().get("--background-color")};
    background-color: var(--background-color); 
}

.x6-port-body {
    display: none;
}

.table-node {
    padding-bottom: 10px;
    color: var(--text-color);
    cursor: default;
}

.table-node table {
    background-color: var(--background-color);
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.table-node .head,
.table-node .column {
    white-space: nowrap;
}

.table-node .head {
    height: 35px;
    line-height: 35px;
    font-size: 16px;

    color: var(--background-color);
    background-color: var(--border-color);
    --comment-color: var(--background-color);
}

.table-node .head th {
    text-align: center;
    border-bottom: 1px solid var(--border-color);
}

.table-node .head .name {
    font-weight: 600;
    padding-left: 1em;
}

.table-node .head .super-table-separator {
    font-weight: 400;
    padding-right: 0.5em;
}

.table-node .head .super-table {
    font-weight: 400;
    padding-right: 0.8em;
}

.table-node .column {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}

.table-node .column .icon,
.table-node .column .type {
    padding: 0 0.5em;
}
`

const produceSvgViewBoxPadding = (viewBox: string, padding: number): string => {
    const items = viewBox.split(/\s+/)
    if (items.length != 4) {
        throw new Error(`viewBox length not 4: ${items}`)
    }
    const minX: number = parseFloat(items[0])
    const minY: number = parseFloat(items[1])
    const width: number = parseFloat(items[2])
    const height: number = parseFloat(items[3])

    return `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`
}

const produceSvg = (svg: SVGSVGElement) => {
    for (let i = 0; i < svg.children.length; i++) {
        const child = svg.children[i]
        if (child.classList.contains("x6-graph-svg-viewport")) {
            child.removeAttribute("transform")
            break
        }
    }

    const viewport = svg.getAttribute("viewBox")
    if (viewport) {
        svg.setAttribute("viewBox", produceSvgViewBoxPadding(viewport, 50))
    }
}

export const exportGraphSVG = (model: DeepReadonly<GenModelInput>, graph: DeepReadonly<Graph>) => {
    graph.exportSVG(`model-[${model.name}].svg`, {
        beforeSerialize: produceSvg,
        preserveDimensions: true,
        stylesheet: exportStyleSheet()
    })
}

export const exportGraphPNG = (model: DeepReadonly<GenModelInput>, graph: DeepReadonly<Graph>) => {
    graph.exportPNG(`model-[${model.name}].png`, {
        quality: 1,
        padding: 50,
        stylesheet: exportStyleSheet()
    })
}
