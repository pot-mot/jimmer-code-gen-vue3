import {NodeView} from '@antv/x6'
import {COMMON_COLOR, LINE_WIDTH, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";

export class SimpleNodeView extends NodeView {
    protected renderMarkup() {
        if (this.cell.shape !== TABLE_NODE) return undefined

        return this.renderJSONMarkup(
            [
                {
                    tagName: 'rect',
                    selector: 'body',
                    attrs: {
                        fill: 'rgba(0,0,0,0.02)',
                        stroke: COMMON_COLOR,
                        strokeWidth: LINE_WIDTH,
                    }
                }
            ]
        )
    }

    update() {
        if (this.cell.shape !== TABLE_NODE) return undefined

        super.update({
            body: {
                refWidth: '100%',
            }
        })
    }
}
