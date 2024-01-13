import {Edge, Graph} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_LINE_WIDTH,
    ASSOCIATION_TYPE_BUTTON,
    COMMON_COLOR,
    DEFAULT_ASSOCIATION_TYPE, HIGHLIGHT_ASSOCIATION_LINE_WIDTH, HIGHLIGHT_COLOR
} from "@/components/business/modelEditor/constant.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {setAssociationFake} from "@/components/pages/ModelEditor/graph/associationEdge/associationFake.ts";
import {
    reverseSinglePartAssociationType
} from "@/components/pages/ModelEditor/graph/associationEdge/associationTypeData.ts";
import {syncAssociationName} from "@/components/pages/ModelEditor/graph/associationEdge/associationName.ts";

const createAssociationTypeButtonAttrs = (
    associationType: AssociationType,
    hover: boolean = false,
    select: boolean = false
) => {
    let width = associationType.length * 11
    let height = 22

    if (hover) {
        const diff = (HIGHLIGHT_ASSOCIATION_LINE_WIDTH - ASSOCIATION_LINE_WIDTH)
        width += diff * 2
        height += diff * 2
    }

    let x = -width / 2
    let y = -height / 2

    return {
        type: ASSOCIATION_TYPE_BUTTON,
        distance: 0.5,
        hover,
        select,
        markup: [
            {
                tagName: 'rect',
                attrs: {
                    stroke: select ? HIGHLIGHT_COLOR : COMMON_COLOR,
                    strokeWidth: hover ? HIGHLIGHT_ASSOCIATION_LINE_WIDTH : ASSOCIATION_LINE_WIDTH,
                    height,
                    width,
                    x,
                    y,
                    rx: 5,
                    ry: 5,
                    fill: 'white',
                    cursor: 'pointer',
                },
            },
            {
                tagName: 'text',
                textContent: associationType,
                attrs: {
                    fill: select ? HIGHLIGHT_COLOR : COMMON_COLOR,
                    fontWeight: 400,
                    fontSize: 14,
                    y: 5,
                    textAnchor: 'middle',
                    pointerEvents: 'none',
                },
            },
        ],
    }
}

const getAssociationTypeButtons = (edge: Edge) => {
    return edge.getTools()?.items
        .filter(it => {
            return (it as any)?.name == 'button' && (it as any)?.args.type == ASSOCIATION_TYPE_BUTTON
        })
}

const handleButtonClick = (edge: Edge, graph: Graph, e: MouseEvent) => {
    if (!graph.isSelected(edge)) {
        graph.select(edge)
        return
    }

    const associationType = getAssociationType(edge)

    const box = (e.target as HTMLElement).getBoundingClientRect()

    const left = (e.clientX - box.x) < (box.width / 2)

    graph.startBatch("Update association_edge type")

    setAssociationType(
        edge,
        reverseSinglePartAssociationType(
            associationType,
            left ? "SOURCE" : "TARGET"
        )
    )

    syncAssociationName(edge)

    graph.stopBatch("Update association_edge type")
}

export const setAssociationTypeButton = (
    edge: Edge,
    graph: Graph,
    state: { hover?: boolean, select?: boolean } = {}
) => {
    const tools = edge.getTools()

    let {hover, select} = state

    if (tools && tools.items.length != 0) {
        const typeBottoms = getAssociationTypeButtons(edge)

        hover = (hover == undefined ? (typeBottoms?.[0] as any)?.args?.hover : hover)
        select = (select == undefined ? (typeBottoms?.[0] as any)?.args?.select : select)

        if (typeBottoms && typeBottoms.length > 0) {
            const newTools = tools.items.filter(it => {
                return !((it as any)?.name == 'button' && (it as any)?.args.type == ASSOCIATION_TYPE_BUTTON)
            })
            edge.setTools(newTools)
        }
    }

    edge.addTools([
        {
            name: 'button',
            args: {
                ...createAssociationTypeButtonAttrs(getAssociationType(edge), hover, select),
                onClick: (args: any) => {
                    handleButtonClick(edge, graph, args.e)
                }
            },
        },
    ])
}

export const getAssociationType = (edge: Edge, defaultAssociationType: AssociationType = DEFAULT_ASSOCIATION_TYPE): AssociationType => {
    let temp = edge.getData()?.association.associationType
    if (temp == undefined) {
        setAssociationType(edge, defaultAssociationType)
        temp = defaultAssociationType
    }
    return temp
}

const setAssociationType = (edge: Edge, associationType: AssociationType) => {
    edge.setData({association: {associationType}}, {deep: true})
    if (associationType == 'MANY_TO_MANY') {
        setAssociationFake(edge, false)
    }
}

const syncAssociationType = (edge: Edge, graph: Graph) => {
    setAssociationTypeButton(edge, graph)
}

export const useAssociationType = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        const associationType = getAssociationType(edge)
        if (associationType == null) {
            setAssociationType(edge, DEFAULT_ASSOCIATION_TYPE)
        }
        setAssociationTypeButton(edge, graph)
    })

    graph.on('edge:change:data', ({edge}) => {
        if (edge.shape != ASSOCIATION_EDGE) return

        syncAssociationType(edge, graph)
    })
}
