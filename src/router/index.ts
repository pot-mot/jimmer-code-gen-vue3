import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {useGlobalLoadingStore} from "../components/global/loading/GlobalLoadingStore.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: () => import("../components/pages/Index/Page.vue")
    },
    {
        path: "/models",
        name: "ModelList",
        component: () => import("../components/pages/ModelList/Page.vue")
    },
    {
        path: "/model/:id",
        name: "ModelEditor",

        component: () => import("../components/pages/ModelEditor/Page.vue")
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // @ts-ignore
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

// @ts-ignore
router.beforeEach((to, from, next) => {
    useGlobalLoadingStore().start()
    next()
})

// @ts-ignore
router.afterEach((to, from, next) => {
    useGlobalLoadingStore().end()
})
