import {Graph} from "@antv/x6";
import {MiniMap} from "@antv/x6-plugin-minimap";
import {nextTick, ref} from "vue";

export const useMiniMap = (_graph: () => Graph, _container: () => HTMLElement | undefined) => {
    const showMinimap = ref(false)

    const minimap = ref<MiniMap | undefined>()

    const setMiniMap = async () => {
        await nextTick()

        const graph = _graph()
        const container = _container()

        if (!graph || !container) return

        minimap.value = new MiniMap({
            container,
            width: container.clientWidth,
            height: container.clientHeight,

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

        graph.use(
            minimap.value
        );
    }

    const toggleMinimap = async () => {
        showMinimap.value = !showMinimap.value
        if (showMinimap.value) {
            await setMiniMap()
        } else {
            minimap.value?.dispose()
        }
    }

    return {
        showMinimap,
        toggleMinimap,
    }
};