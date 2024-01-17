import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {useGlobalLoadingStore} from "../components/global/loading/GlobalLoadingStore.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "Index",
        component: () => import("../components/pages/Index/IndexPage.vue")
    },
    {
        path: "/models",
        name: "ModelList",
        component: () => import("../components/pages/ModelList/ModelListPage.vue")
    },
    {
        path: "/model/:id",
        name: "ModelEditor",

        component: () => import("../components/pages/ModelEditor/ModelEditorPage.vue")
    }
]

export const router = createRouter({
    history: createWebHistory(),
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
    useGlobalLoadingStore().add()
    next()
})

// @ts-ignore
router.afterEach((to, from, next) => {
    useGlobalLoadingStore().sub()
})
