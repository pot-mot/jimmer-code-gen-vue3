import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: () => import("../views/Index.vue")
    },
    {
        path: "/table",
        name: "Table",
        component: () => import("../views/table/Index.vue"),
        children: [
            {
                path: "/table/graph",
                name: "TableGraph",
                component: () => import("../views/table/Graph.vue"),
            },
            {
                path: "/table/list",
                name: "TableList",
                component: () => import("../views/table/List.vue"),
            },
            {
                path: "/table/detail",
                name: "TableDetail",
                component: () => import("../views/table/Detail.vue"),
            },
        ]
    },
    {
        path: "/entity",
        name: "entity",
        component: () => import("../views/entity/Index.vue")
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});