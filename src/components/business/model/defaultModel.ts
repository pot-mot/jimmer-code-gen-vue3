import {GenModelInput} from "@/api/__generated/model/static";
import {DataSourceType_CONSTANTS, GenLanguage_CONSTANTS} from "@/api/__generated/model/enums";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";

export const getDefaultModel = (): GenModelInput => {
    const genConfigStore = useGlobalGenConfigStore()

    const defaultModel: GenModelInput = {
        remark: "",
        name: "",
        graphData:
`{
    "json": {
        "cells": []
    },
    "zoom": 1,
    "transform": null
}`,
        language: GenLanguage_CONSTANTS[0],
        dataSourceType: DataSourceType_CONSTANTS[0],
        author: "",
        packagePath: "",
        tablePath: "",
        databaseNamingStrategy: "LOWER_CASE",
        realFk: true,
        idViewProperty: true,
        logicalDeletedAnnotation: "",
        tableAnnotation: true,
        columnAnnotation: true,
        joinTableAnnotation: true,
        joinColumnAnnotation: true,
        tableNamePrefixes: "",
        tableNameSuffixes: "",
        tableCommentPrefixes: "",
        tableCommentSuffixes: "",
        columnNamePrefixes: "",
        columnNameSuffixes: "",
        columnCommentPrefixes: "",
        columnCommentSuffixes: "",
        enums: [],
    }

    if (genConfigStore.isLoaded) {
        const globalGenConfig = genConfigStore.genConfig
        for (let key of Object.keys(globalGenConfig)) {
            if (key in defaultModel) {
                // @ts-ignore
                defaultModel[key] = globalGenConfig[key]
            }
        }
    }

    return defaultModel
}
