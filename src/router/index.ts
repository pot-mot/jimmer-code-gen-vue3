import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: () => import("../views/Index.vue")
    },
    {
        path: "/graph",
        name: "Graph",
        component: () => import("../views/Graph.vue"),
    },
    {
        path: "/data",
        name: "Data",
        component: () => import("../views/Data.vue"),
    },
    {
        path: "/entity",
        name: "Entity",
        component: () => import("../views/Entity.vue")
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