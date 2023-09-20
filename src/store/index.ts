// 仓库
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建仓库
export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

