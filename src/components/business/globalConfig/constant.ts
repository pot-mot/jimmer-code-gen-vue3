export const GenerateConfiguratorOptions = [
    {
        name: 'GenConfigForm',
        label: '全局生成配置',
    },
    {
        name: 'TypeMappingsEditor',
        label: '类型映射配置'
    },
    {
        name: 'ColumnDefaultEditor',
        label: '列默认配置'
    }
]

export type GenerateConfiguratorOption = typeof GenerateConfiguratorOptions[number]
