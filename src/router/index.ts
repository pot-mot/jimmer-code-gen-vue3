import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {sendI18nMessage} from "@/message/message.ts";

const routes: RouteRecordRaw[] = [
    {
        path: "",
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

let routerChangeFlag: string | undefined = undefined

router.beforeEach((to, from, next) => {
    routerChangeFlag = useGlobalLoadingStore().start(`to: ${to.fullPath}, from: ${from.fullPath}`)
    next()
})

router.afterEach((to, from) => {
    if (routerChangeFlag !== undefined) {
        useGlobalLoadingStore().stop(routerChangeFlag)
    } else {
        sendI18nMessage("MESSAGE_router_loading_closeFail", 'warning', {to, from})
    }
})
