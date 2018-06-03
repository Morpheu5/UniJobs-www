export const state = () => ({
    locales: ['it', 'en'],
    locale: 'it'
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    }
}