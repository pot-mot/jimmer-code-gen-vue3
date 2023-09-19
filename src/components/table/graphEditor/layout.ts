import {DagreLayout} from '@antv/layout'

export const dagreLayout = new DagreLayout({
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    ranksep: 30,
    nodesep: 15,
    controlPoints: true,
})