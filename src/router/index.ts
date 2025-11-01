import {createRouter, createWebHashHistory, type RouteRecordRaw} from 'vue-router'
import {sendMessage} from "@/components/message/messageApi.ts";
import {startLoading} from "@/components/loading/loadingApi.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "",
        name: "ModelList",
        component: () => import("../pages/modelList/ModelListPage.vue")
    },
    {
        path: "/model/:id",
        name: "ModelEditor",

        component: () => import("../pages/ModelEditor/ModelEditorPage.vue")
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
});

let stopRouteLoading: () => void | undefined

router.beforeEach((to, _from, next) => {
    stopRouteLoading = startLoading(`to: ${to.fullPath}`).stop
    next()
})

router.afterEach((_to, _from, _failure) => {
    if (stopRouteLoading !== undefined) {
        stopRouteLoading()
    } else {
        sendMessage("Router loading fail", {type: 'warning'})
    }
})
