import {Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, FAKE_ASSOCIATION_LINE_DASHARRAY} from "@/components/pages/ModelEditor/constant.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {
    getEdgeSelectFlag,
    setEdgeSelectFlag
} from "@/components/pages/ModelEditor/graph/associationEdge/edgeSelectedState.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {useAssociationDialogsStore} from "@/store/modelEditor/dialogs/AssociationDialogsStore.ts";

const getAssociationFake = (edge: Edge): boolean => {
    let temp = edge.getData()?.association.fake
    if (temp === undefined) {
        const defaultAssociationFake = !(useGenConfigContextStore().context.realFk)
        setAssociationFake(edge, defaultAssociationFake)
        temp = defaultAssociationFake
    }
    return temp
}

const setAssociationFake = (edge: Edge, fake: boolean) => {
    edge.setData({association: {fake}}, {deep: true})
}

const setAssociationFakeLine = (edge: Edge) => {
    const fake = getAssociationFake(edge)

    if (fake) {
        edge.setAttrByPath("line/strokeDasharray", FAKE_ASSOCIATION_LINE_DASHARRAY)
    } else {
        edge.removeAttrByPath("line/strokeDasharray")
    }
}

export const useAssociationFake = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        if (edge.getData() === undefined || edge.getData().association === undefined) return

        setAssociationFakeLine(edge)
    })

    graph.on('edge:change:data', ({edge, previous, current}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        if (edge.getData() === undefined || edge.getData().association === undefined) return

        const previousData = previous as { association?: GenAssociationModelInput }
        const currentData = current as { association?: GenAssociationModelInput }

        if (previousData?.association?.fake === currentData?.association?.fake) return

        setAssociationFakeLine(edge)
    })

    /**
     * 当 Edge 的线条被点击时，切换关联类型
     *
     * 此时因为存在 edge:select 事件且触发在 edge:click 之前，所以需要 EDGE_SELECT_FLAG 阻止初次点击效果
     */
    graph.on('edge:mousedown', ({edge, e}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        if (edge.getData() === undefined || edge.getData().association === undefined) return

        if (e.ctrlKey || e.metaKey) return

        if (!getEdgeSelectFlag(edge)) {
            setEdgeSelectFlag(edge, true)
            return
        }

        const oldAssociationFake = getAssociationFake(edge)

        useAssociationDialogsStore().modify(edge.id, () => {
            setAssociationFake(edge, !oldAssociationFake)
        })
    })

    graph.on('edge:unselected', ({edge}) => {
        setEdgeSelectFlag(edge, false)
    })
}
