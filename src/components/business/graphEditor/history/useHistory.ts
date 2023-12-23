import {Graph} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";

export const useHistory = (graph: Graph) => {
    graph.use(
        new History({
            enabled: true,
        })
    )

    // 默认合并移动事件
    graph.on('node:move', () => {
        graph.startBatch('node move')
    })

    graph.on('node:moved', () => {
        graph.stopBatch('node move')
    })
}
