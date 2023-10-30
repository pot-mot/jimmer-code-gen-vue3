import {nextTick, ref, Ref} from "vue";
import {LayoutDirection, layoutByLevel} from "./layoutByLevel.ts";
import {Graph} from "@antv/x6";
import {defaultZoomRange} from "../../../components/AssociationEditor/constant.ts";

export const useFitAndLayout = (_graph: () => Graph) => {
    const layoutDirection: Ref<LayoutDirection> = ref("LR")

    /** 布局 */
    const layout = (direction: LayoutDirection = layoutDirection.value) => {
        layoutByLevel(_graph(), direction)
    }

    /**
     * 使画布适应内容
     */
    const fit = () => {
        const graph = _graph()

        graph.scaleContentToFit({...defaultZoomRange, padding: 100})
        graph.centerContent()
    }

    /**
     * 延时适应画布并布局
     */
    const layoutAndFit = async (direction: LayoutDirection = layoutDirection.value) => {
        await nextTick()
        layout(direction)
        fit()
    }

    return {
        layoutDirection,
        layout,
        fit,
        layoutAndFit
    }
}