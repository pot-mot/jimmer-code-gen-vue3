export const GenerateConfigurator_CONSTANTS = [
    'GenConfigForm',
    'TypeMappingsEditor',
    'ColumnDefaultEditor'
] as const;
export type GenerateConfiguratorOption = typeof GenerateConfigurator_CONSTANTS[number];

export const GenerateConfigurator: {
    [key in GenerateConfiguratorOption]: {
        name: GenerateConfiguratorOption,
        label: string
    }
} = {
    GenConfigForm: {
        name: 'GenConfigForm',
        label: '全局生成配置',
    },
    TypeMappingsEditor: {
        name: 'TypeMappingsEditor',
        label: '类型映射配置'
    },
    ColumnDefaultEditor: {
        name: 'ColumnDefaultEditor',
        label: '列默认配置'
    }
}

export const GenerateConfiguratorOptions = Object.values(GenerateConfigurator)
