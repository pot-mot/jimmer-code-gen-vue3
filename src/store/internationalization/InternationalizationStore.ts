import {defineStore} from "pinia";
import {ref, computed} from "vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import en from 'element-plus/es/locale/lang/en.mjs'

const languageOptions = {
    'zh-cn': zhCn,
    'en': en,
}

export type LanguageType = keyof typeof languageOptions

export type LocaleType = typeof languageOptions[keyof typeof languageOptions]

export const languageTypes = Object.keys(languageOptions) as LanguageType[]

export const useInternationalizationStore = defineStore(
    'InternationalizationStore',
    () => {
        const language = ref<LanguageType>('zh-cn')

        const locale = computed<LocaleType>(() => {
            return languageOptions[language.value]
        })

        return {
            language,
            locale
        }
    }
)
