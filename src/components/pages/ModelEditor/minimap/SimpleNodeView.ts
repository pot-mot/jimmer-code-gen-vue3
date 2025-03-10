import {NodeView} from '@antv/x6'
import {BORDER_COLOR, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";

export class SimpleNodeView extends NodeView {
    protected renderMarkup() {
        if (this.cell.shape !== TABLE_NODE) return undefined

        return this.renderJSONMarkup(
            [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ]
        )
    }

    update() {
        if (this.cell.shape !== TABLE_NODE) return undefined

        const style = this.cell.data.wrapper?.value?.style
        let fillColor = style?.getPropertyValue("--border-color")
        if (fillColor === undefined || fillColor === '') {
            fillColor = BORDER_COLOR
        }

        super.update({
            body: {
                refWidth: '100%',
                refHeight: '100%',
                fill: fillColor,
            },
        })
    }
}
