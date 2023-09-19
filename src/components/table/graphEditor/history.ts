import {Graph} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";

export const useHistory = (graph: Graph) => {
    graph.use(
        new History({
            enabled: true,
            ignoreAdd: false,
            ignoreChange: false,
            ignoreRemove: false,
        })
    );
};