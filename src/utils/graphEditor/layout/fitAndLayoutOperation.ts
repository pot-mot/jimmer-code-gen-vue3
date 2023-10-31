import {nextTick, ref, Ref} from "vue";
import {LayoutDirection, layoutByLevel} from "./layoutByLevel.ts";
import {Graph} from "@antv/x6";
import {defaultZoomRange} from "../../../components/AssociationEditor/constant.ts";

export const useFitAndLayoutOperation = (_graph: () => Graph) => {
    const layoutDirection: Ref<LayoutDirection> = ref("LR")

    return {
        layoutDirection,
        layout: () => layout(_graph(), layoutDirection.value),
        fit: () => fit(_graph()),
        layoutAndFit: () => layoutAndFit(_graph(), layoutDirection.value)
    }
}

/** 布局 */
export const layout = (graph: Graph, direction: LayoutDirection) => {
    layoutByLevel(graph, direction)
}

/**
 * 使画布适应内容
 */
export const fit = (graph: Graph) => {
    graph.scaleContentToFit({...defaultZoomRange, padding: 100})
    graph.centerContent()
}

/**
 * 延时适应画布并布局
 */
export const layoutAndFit = async (graph: Graph, direction: LayoutDirection) => {
    await nextTick()
    layout(graph, direction)
    fit(graph)
}