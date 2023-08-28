import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "index",
        component: () => import("../views/Index.vue")
    },
    {
        path: "/graph",
        name: "graph",
        component: () => import("../views/Graph.vue")
    },
    {
        path: "/entity",
        name: "entity",
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
            return { top: 0 }
        }
    },
});