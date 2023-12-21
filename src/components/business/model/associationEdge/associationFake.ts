import {Edge, Graph} from "@antv/x6";
import {SWITCH_ASSOCIATION_FAKE_FLAG} from "@/components/business/model/constant.ts";
import {judgeClickBox} from "@/utils/clickBox.ts";

const setAssociationFakeData = (edge: Edge, fake: boolean) => {
    edge.setData({association: {fake}}, {deep: true})
}

const setAssociationFakeStyle = (edge: Edge, fake: boolean) => {
    if (fake) {
        edge.setAttrByPath("line/strokeDasharray", 5)
    } else {
        edge.removeAttrByPath("line/strokeDasharray")
    }
}

export const setAssociationFake = (edge: Edge, fake: boolean) => {
    setAssociationFakeData(edge, fake)
    setAssociationFakeStyle(edge, fake)
}

export const getAssociationFake = (edge: Edge, defaultAssociationFake: boolean = false): boolean => {
    const dataAssociationFake = edge.getData()?.association.fake

    if (dataAssociationFake != undefined || dataAssociationFake != null) {
        setAssociationFakeStyle(edge, dataAssociationFake)
        return dataAssociationFake
    } else {
        setAssociationFake(edge, defaultAssociationFake)
        return defaultAssociationFake
    }
}

const syncAssociationFake = (edge: Edge) => {
    getAssociationFake(edge)
}

export const useAssociationFake = (graph: Graph) => {
    /**
     * 同步 attrs 为 data
     */
    graph.on('edge:added', ({edge}) => {
        syncAssociationFake(edge)
    })
    graph.on('edge:change:data', ({edge}) => {
        syncAssociationFake(edge)
    })

    /**
     * 当 Edge 的线条被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 SWITCH_ASSOCIATION_FAKE_FLAG 阻止初次点击效果
     */
    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey || e.metaKey) return

        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_FAKE_FLAG?: boolean}

        if (!(SWITCH_ASSOCIATION_FAKE_FLAG in edgeWithFlag)) {
            edgeWithFlag.SWITCH_ASSOCIATION_FAKE_FLAG = true
            // 使 SWITCH_ASSOCIATION_FAKE_FLAG 不被序列化
            Object.defineProperty(edgeWithFlag, SWITCH_ASSOCIATION_FAKE_FLAG, { enumerable: false, writable: true })
            return;
        } else if (!edgeWithFlag.SWITCH_ASSOCIATION_FAKE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_FAKE_FLAG = true
            return
        }

        const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${edge.id}"]`)! as SVGGElement

        const labelBoxes = [...edgeSvg.querySelectorAll('.x6-edge-label').values()].map(it => it.getBoundingClientRect())

        for (let labelBox of labelBoxes) {
            if (judgeClickBox(labelBox, e.clientX, e.clientY)) return
        }

        e.preventDefault()
        e.stopPropagation()

        setAssociationFake(edge, !getAssociationFake(edge))
    })
    /**
     * 在 edge:unselected 后，重置 SWITCH_ASSOCIATION_FAKE_FLAG
     */
    graph.on('edge:unselected', ({edge}) => {
        const edgeWithFlag = edge as Edge & {SWITCH_ASSOCIATION_FAKE_FLAG?: boolean}

        if ((SWITCH_ASSOCIATION_FAKE_FLAG in edgeWithFlag) && edgeWithFlag.SWITCH_ASSOCIATION_FAKE_FLAG) {
            edgeWithFlag.SWITCH_ASSOCIATION_FAKE_FLAG = false
            return
        }
    })
}
