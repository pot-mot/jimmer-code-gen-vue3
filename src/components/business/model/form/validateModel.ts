import {
    GenAssociationModelInput,
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {AssociationEdge, GraphData, TableNode, validateGraphData} from "@/shape/GraphData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {validateEnum} from "@/components/business/enum/validateEnum.ts";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {DeepReadonly} from "vue";

export const validateModelForm = (
    model: DeepReadonly<GenModelInput>,
): string[] => {
    const {
        messageList,
        errors
    } = validateFormGraphData(
        model.graphData,
        model.enums
    )

    errors.forEach(e =>
        console.error(e)
    )

    if (model.name.length === 0) {
        messageList.push('模型名不得为空')
    }

    return messageList
}

export const validateFormGraphData = (
    graphDataStr: DeepReadonly<string>,
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>
): {
    messageList: string[],
    errors: any[]
} => {
    const messageList: string[] = []
    const errors = []

    try {
        const _graphData = JSON.parse(graphDataStr)

        try {
            validateGraphData(
                _graphData,
                e => {
                    throw e
                }
            )

            const graphData = _graphData as GraphData

            const cells = graphData.json.cells

            const nodes = cells.filter(it => it.shape === TABLE_NODE) as TableNode[]
            const tables = nodes.map(it => it.data.table)
            const tableNameMap = new Map<string, GenTableModelInput>

            for (let table of tables) {
                const current = tableNameMap.get(table.name)
                if (current) {
                    messageList.push(`表名【${table.name}】重复`)
                } else {
                    tableNameMap.set(table.name, table)
                }
            }

            const edges = cells.filter(it => it.shape === ASSOCIATION_EDGE) as AssociationEdge[]
            const associations = edges.map(it => it.data.association)
            const associationNameMap = new Map<string, GenAssociationModelInput>
            for (let association of associations) {
                const current = associationNameMap.get(association.name)
                if (current) {
                    messageList.push(`关联名【${association.name}】重复`)
                } else {
                    associationNameMap.set(association.name, association)
                }
            }

            const context: ModelFormValidateContext = {
                nodes,
                tables,
                tableNameMap,
                edges,
                associations,
                associationNameMap,
                enums
            }

            for (let node of nodes) {
                const table = node.data.table

                const nodeMessageList = validateTable(
                    table,
                    context.tables.filter(it => it !== table),
                    context.enums
                )
                messageList.push(...nodeMessageList.map(it => `表【${table.name}】存在问题：${it}`))
            }

            for (let edge of edges) {
                const association = edge.data.association

                const edgeMessageList = validateAssociation(
                    association,
                    context.associations.filter(it => it !== association),
                    context.tables
                )
                messageList.push(...edgeMessageList.map(it => `关联【${association.name}】存在问题：${it}`))
            }

            for (let genEnum of enums) {
                const enumMessageList: string[] = validateEnum(genEnum, enums.filter(it => it.name !== genEnum.name))
                messageList.push(...enumMessageList.map(it => `枚举【${genEnum.name}】存在问题 ${it}`))
            }
        } catch (e) {
            messageList.push('graphData 校验失败，请参考控制台报错')
            errors.push(e)
        }
    } catch (e) {
        messageList.push('graphData json 转换失败，请参考控制台报错')
        errors.push(e)
    }

    return {
        messageList,
        errors
    }
}

interface ModelFormValidateContext {
    nodes: DeepReadonly<Array<TableNode>>
    tables: DeepReadonly<Array<GenTableModelInput>>
    tableNameMap: DeepReadonly<Map<string, GenTableModelInput>>
    edges: DeepReadonly<Array<AssociationEdge>>
    associations: DeepReadonly<Array<GenAssociationModelInput>>
    associationNameMap: DeepReadonly<Map<string, GenAssociationModelInput>>
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>
}
