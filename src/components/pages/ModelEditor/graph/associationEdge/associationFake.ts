import {Edge, Graph} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    DEFAULT_ASSOCIATION_FAKE,
    FAKE_ASSOCIATION_LINE_DASHARRAY,
} from "@/components/business/modelEditor/constant.ts";
import {getAssociationType} from "@/components/pages/ModelEditor/graph/associationEdge/associationTypeButton.ts";

export const setAssociationFake = (edge: Edge, fake: boolean) => {
    edge.setData({association: {fake}}, {deep: true})
}

export const getAssociationFake = (edge: Edge, defaultAssociationFake: boolean = DEFAULT_ASSOCIATION_FAKE): boolean => {
    let temp = edge.getData()?.association.fake
    if (temp == undefined) {
        setAssociationFake(edge, defaultAssociationFake)
        temp = defaultAssociationFake
    }
    return temp
}

const syncAssociationFake = (edge: Edge) => {
    const fake = getAssociationFake(edge)

    if (fake) {
        edge.setAttrByPath("line/strokeDasharray", FAKE_ASSOCIATION_LINE_DASHARRAY)
    } else {
        edge.removeAttrByPath("line/strokeDasharray")
    }
}

export const useAssociationFake = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        syncAssociationFake(edge)
    })
    graph.on('edge:change:data', ({edge}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        syncAssociationFake(edge)
    })

    /**
     * 当 Edge 的线条被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 SWITCH_ASSOCIATION_FAKE_FLAG 阻止初次点击效果
     */
    graph.on('edge:click', ({edge, e}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        if (e.ctrlKey || e.metaKey) return

        if (!graph.isSelected(edge)) {
            graph.select(edge)
            return
        }

        graph.startBatch("Update association_edge fake")

        const associationType = getAssociationType(edge)

        // 多对多的外键必须为真实外键
        if (associationType == 'MANY_TO_MANY') {
            setAssociationFake(edge, false)
        } else {
            const oldAssociationFake = getAssociationFake(edge)
            setAssociationFake(edge, !oldAssociationFake)
        }

        graph.stopBatch("Update association_edge fake")
    })
}
