import {NodeView} from '@antv/x6'
import {COMMON_COLOR, LINE_WIDTH} from "@/components/business/modelEditor/constant.ts";

export class SimpleNodeView extends NodeView {
    protected renderMarkup() {
        return this.renderJSONMarkup(
            [
                {
                    tagName: 'rect',
                    selector: 'body',
                    attrs: {
                        fill: 'rgba(0,0,0,0.1)',
                        stroke: COMMON_COLOR,
                        strokeWidth: LINE_WIDTH,
                    }
                },
                {
                    tagName: 'text',
                    selector: 'tableName',
                    textContent: this.cell.getData()?.table.name ?? `non-name-node ${this.cell.id}`,
                    attrs: {
                        fill: COMMON_COLOR,
                        fontSize: 25,
                        fontWeight: 600,
                        y: 35,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        textAnchor: 'middle',
                    },
                },
            ]
        )
    }

    update() {
        super.update({
            body: {
                refWidth: '100%',
            },
            tableName: {
                x: 'calc(50%)'
            }
        })
    }
}
