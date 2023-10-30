import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

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
        path: "/entity",
        name: "Entity",
        component: () => import("../views/Entity.vue")
    },
    {
        path: "/model",
        name: "Model",
        component: () => import("../views/Model.vue")
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

router.beforeEach((to, from, next) => {
    next()
})