import {NodeView} from '@antv/x6'
import {BACKGROUND_COLOR, BORDER_COLOR, LINE_WIDTH, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";

export class SimpleNodeView extends NodeView {
    protected renderMarkup() {
        if (this.cell.shape !== TABLE_NODE) return undefined

        return this.renderJSONMarkup(
            [
                {
                    tagName: 'rect',
                    selector: 'body',
                    attrs: {
                        fill: BACKGROUND_COLOR,
                        stroke: BORDER_COLOR,
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
