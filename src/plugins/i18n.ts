import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        en: 'English',
        zh: '中文',
        背单词: 'Learn',
        词表: 'Words',
        天: 'DAYS',
        数据统计: 'Statistics'
    },
    zh: {
        en: 'English',
        zh: '中文',
        背单词: '背单词',
        词表: '词表',
        天: "天",
        数据统计: '数据统计'
    }
}

const i18n = createI18n({
    locale: 'zh',
    fallbackLocale: 'en',
    messages,
})

export default i18n