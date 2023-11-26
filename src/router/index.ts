import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {useGlobalLoadingStore} from "../components/global/loading/GlobalLoadingStore.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: () => import("../components/pages/Index/Page.vue")
    },
    {
        path: "/association",
        name: "AssociationEditor",
        component: () => import("../components/pages/AssociationEditor/Page.vue"),
    },
    {
        path: "/entity",
        name: "EntityGenerator",
        component: () => import("../components/pages/EntityGenerator/Page.vue")
    },
    {
        path: "/models",
        name: "ModelList",
        component: () => import("../components/pages/ModelList/Page.vue")
    },
    {
        path: "/model",
        name: "ModelEditor",
        component: () => import("../components/pages/ModelEditor/Page.vue")
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
    useGlobalLoadingStore().start()
    next()
})

router.afterEach((to, from, next) => {
    useGlobalLoadingStore().end()
})