import {Shape} from "@antv/x6";

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
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                },
            },
        })
    },

    allowBlank: false,
    allowNode: false
}