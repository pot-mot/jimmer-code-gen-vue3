import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {useGlobalLoadingStore} from "../components/global/loading/GlobalLoadingStore.ts";
import {sendMessage} from "@/utils/message.ts";

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

let routerChangeFlag: string

router.beforeEach((to, from, next) => {
    routerChangeFlag = useGlobalLoadingStore().start(`to: ${to.fullPath}, from: ${from.fullPath}`)
    next()
})

router.afterEach((to, from) => {
    if (routerChangeFlag) {
        useGlobalLoadingStore().stop(routerChangeFlag)
    } else {
        sendMessage('出现未经 beforeEach 设置 loadingFlag 跳转的路由', 'warning', {to, from})
    }
})
