import {Shape} from "@antv/x6";
import {COMMON_COLOR} from "../constant";

export const AssociationEdge = {
    router: {
        name: 'er',
        args: {
            offset: 25,
            direction: 'H',
        },
    },

    createEdge() {
        return new Shape.Edge({
            attrs: {
                line: {
                    stroke: COMMON_COLOR,
                    strokeWidth: 1,
                },
            },
        })
    },

    allowBlank: false,
    allowNode: false
}