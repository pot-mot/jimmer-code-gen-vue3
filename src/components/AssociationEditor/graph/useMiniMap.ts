import {Graph} from "@antv/x6";
import {MiniMap} from "@antv/x6-plugin-minimap";
import {nextTick, ref} from "vue";

export const useMiniMap = (_graph: () => Graph, _container: () => HTMLElement | undefined) => {
    const showMinimap = ref(false)

    const setMiniMap = async () => {
        const graph = _graph()
        const container = _container()

        if (!graph || !container) return

        await nextTick()
        graph.use(
            new MiniMap({
                container,
                width: container.clientWidth,
                height: container.clientHeight,
                scalable: false,

                graphOptions: {
                    async: true,
                    createCellView(cell) {
                        // 在小地图中不渲染边
                        if (cell.isEdge()) {
                            return null
                        }
                    },
                }
            })
        );
    }

    const toggleMinimap = async () => {
        showMinimap.value = !showMinimap.value
        if (showMinimap.value) {
            await setMiniMap()
        }
    }

    return {
        showMinimap,
        toggleMinimap,
    }
};