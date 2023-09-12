import {KeyValue} from "@antv/x6";
import {COLUMN_HEIGHT} from "../constant";

export const ColumnPortLayout = (portsPositionArgs: KeyValue) => {
    return portsPositionArgs.map((_: any, index: number) => {
        return {
            position: {
                x: 0,
                y: (index + 1) * COLUMN_HEIGHT + 2,
            },
            angle: 0,
        }
    })
}