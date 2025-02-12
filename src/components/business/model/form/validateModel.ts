import {
    GenAssociationModelInput,
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {AssociationEdge, ModelEditorData, TableNode, validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {validateTable} from "@/components/business/table/validateTable.ts";
import {validateEnum} from "@/components/business/enum/validateEnum.ts";
import {validateAssociation} from "@/components/business/association/validateAssociation.ts";
import {DeepReadonly} from "vue";
import {ProjectLocaleKeyParam} from "@/i18n";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";

export const validateModel = (
    model: DeepReadonly<GenModelInput>,
): ProjectLocaleKeyParam[] => {
    const {
        messageList,
        errors
    } = validateGraphDataStr(
        model.graphData,
        model.enums
    )

    errors.forEach(e =>
        console.error(e)
    )

    if (model.name.length === 0) {
        messageList.push('VALIDATE_GenModel_nameCannotBeEmpty')
    }

    return messageList
}

const validateGraphDataStr = (
    graphDataStr: Readonly<string>,
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>
): {
    messageList: ProjectLocaleKeyParam[],
    errors: any[]
} => {
    const messageList: ProjectLocaleKeyParam[] = []
    const errors = []

    try {
        const _graphData = jsonParseThenConvertNullToUndefined(graphDataStr)

        try {
            validateModelEditorData(
                _graphData,
                e => {
                    throw e
                }
            )

            const graphData = _graphData as ModelEditorData

            const cells = graphData.json.cells

            const nodes = cells.filter(it => it.shape === TABLE_NODE) as TableNode[]
            const tables = nodes.map(it => it.data.table)
            const tableNameMap = new Map<string, GenTableModelInput>

            for (const table of tables) {
                const current = tableNameMap.get(table.name)
                if (current) {
                    messageList.push({key: "VALIDATE_GenTable_nameCannotBeDuplicate", args: [table.name]})
                } else {
                    tableNameMap.set(table.name, table)
                }
            }

            const edges = cells.filter(it => it.shape === ASSOCIATION_EDGE) as AssociationEdge[]
            const associations = edges.map(it => it.data.association)
            const associationNameMap = new Map<string, GenAssociationModelInput>
            for (const association of associations) {
                const current = associationNameMap.get(association.name)
                if (current) {
                    messageList.push({key: "VALIDATE_GenAssociation_name_cannotBeDuplicate", args: [association.name]})
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

            for (const node of nodes) {
                const table = node.data.table

                const nodeMessageList = validateTable(
                    table,
                    context.tables.filter(it => it !== table),
                    context.enums
                )

                const withTableNameMessageList = nodeMessageList.map(it => {
                    return {key: 'VALIDATE_GenModel_tableValidError', args: [table.name, it]} as ProjectLocaleKeyParam
                })

                messageList.push(...withTableNameMessageList)
            }

            for (const edge of edges) {
                const association = edge.data.association

                const edgeMessageList = validateAssociation(
                    association,
                    context.associations.filter(it => it !== association),
                    context.tables
                )

                const withAssociationNameMessageList = edgeMessageList.map(it => {
                    return {key: 'VALIDATE_GenModel_tableValidError', args: [association.name, it]} as ProjectLocaleKeyParam
                })

                messageList.push(...withAssociationNameMessageList)
            }

            for (const genEnum of enums) {
                const enumMessageList = validateEnum(
                    genEnum,
                    enums.filter(it => it.name !== genEnum.name)
                )

                const withEnumNameMessageList = enumMessageList.map(it => {
                    return {key: 'VALIDATE_GenModel_enumValidError', args: [genEnum.name, it]} as ProjectLocaleKeyParam
                })

                messageList.push(...withEnumNameMessageList)
            }
        } catch (e) {
            messageList.push('VALIDATE_ModelForm_graphDataValidationFailed')
            errors.push(e)
        }
    } catch (e) {
        messageList.push('VALIDATE_ModelForm_graphDataJsonConversionFailed')
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
