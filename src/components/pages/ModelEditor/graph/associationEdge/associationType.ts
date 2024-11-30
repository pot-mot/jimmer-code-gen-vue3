import {Cell, Edge, Graph} from "@antv/x6";
import {
    ASSOCIATION_EDGE,
    ASSOCIATION_TYPE_BUTTON,
    COMMON_COLOR,
    DEFAULT_ASSOCIATION_TYPE,
    LINE_WIDTH,
} from "@/components/pages/ModelEditor/constant.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {
    reverseSinglePartAssociationType
} from "@/components/pages/ModelEditor/graph/associationEdge/associationTypeExtension.ts";
import {syncAssociationName} from "@/components/pages/ModelEditor/graph/associationEdge/associationName.ts"
import {setEdgeSelectFlag} from "@/components/pages/ModelEditor/graph/associationEdge/edgeSelectedState.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const getAssociationType = (edge: Edge, defaultAssociationType: AssociationType = DEFAULT_ASSOCIATION_TYPE): AssociationType => {
    let temp = edge.getData()?.association.type
    if (temp === undefined) {
        setAssociationType(edge, defaultAssociationType)
        temp = defaultAssociationType
    }
    return temp
}

const setAssociationType = (edge: Edge, type: AssociationType) => {
    edge.setData({association: {type}}, {deep: true})
}


const handleButtonClick = (args: any) => {
    const edge: Edge = args.cell
    const graph: Graph = args.view.graph
    const e: MouseEvent = args.e

    if (!graph.isSelected(edge)) {
        graph.select(edge)
        setEdgeSelectFlag(edge, true)
        return
    }

    const {MODEL_EDITOR} = useModelEditorStore()

    const associationType = getAssociationType(edge)

    const box = (e.target as HTMLElement).getBoundingClientRect()

    const left = (e.clientX - box.x) < (box.width / 2)

    MODEL_EDITOR.modifyAssociation(edge.id, () => {
        setAssociationType(
            edge,
            reverseSinglePartAssociationType(
                associationType,
                left ? "SOURCE" : "TARGET"
            )
        )

        syncAssociationName(edge)
    })
}

const createAssociationTypeButtonAttrs = (
    associationType: AssociationType,
) => {
    let width = associationType.length * 11
    let height = 22

    let x = -width / 2
    let y = -height / 2

    return {
        onClick: handleButtonClick,
        type: ASSOCIATION_TYPE_BUTTON,
        distance: 0.5,
        markup: [
            {
                tagName: 'rect',
                attrs: {
                    stroke: COMMON_COLOR,
                    strokeWidth: LINE_WIDTH,
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
                    fill: COMMON_COLOR,
                    fontWeight: 400,
                    fontSize: 14,
                    y: 5,
                    textAnchor: 'middle',
                    pointerEvents: 'none',
                    userSelect: 'none',
                },
            },
        ],
    }
}

const getAssociationTypeButtons = (edge: Edge) => {
    return edge.getTools()?.items
        .filter(it => {
            return (it as any)?.name === 'button' && (it as any)?.args.type === ASSOCIATION_TYPE_BUTTON
        })
}

const setAssociationTypeButton = (
    edge: Edge,
) => {
    const tools = edge.getTools()

    const newTools: Cell.ToolItem[] = []

    if (tools && tools.items.length !== 0) {
        const typeBottoms = getAssociationTypeButtons(edge)

        if (typeBottoms && typeBottoms.length > 0) {
            newTools.push(
                ...tools.items.filter(it => {
                    return !((it as any)?.name === 'button' && (it as any)?.args.type === ASSOCIATION_TYPE_BUTTON)
                })
            )
        }
    }

    newTools.push(
        {
            name: 'button',
            args: createAssociationTypeButtonAttrs(getAssociationType(edge)),
        }
    )

    edge.setTools(newTools)
}

export const useAssociationType = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        if (edge.getData() === undefined || edge.getData().association === undefined) return

        const associationType = getAssociationType(edge)
        if (associationType === undefined) {
            setAssociationType(edge, DEFAULT_ASSOCIATION_TYPE)
        }
        setAssociationTypeButton(edge)
    })

    graph.on('edge:change:data', ({edge, previous, current}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        if (edge.getData() === undefined || edge.getData().association === undefined) return

        const previousData = previous as { association?: GenAssociationModelInput }
        const currentData = current as { association?: GenAssociationModelInput }

        if (previousData?.association?.type === currentData?.association?.type) return

        setAssociationTypeButton(edge)
    })
}
