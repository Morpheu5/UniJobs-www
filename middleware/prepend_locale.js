export default function (context) {
    const { route, redirect, app } = context;
    const { path, query } = route;

    const localeCodes = app.i18n.locales.map(l => l.code);
    const urlRegex = new RegExp(`^\/(?!${localeCodes.join('|')}).*$`);
    if (urlRegex.test(path)) {
        // URL has no locale code.
        // Prepend the URL with the previously selected code or the default one.
        const previousLocaleCode = app.$cookies.get('previous_locale_code') || null;
        if (null !== previousLocaleCode) {
            return redirect(307, `/${previousLocaleCode.substring(0, 2)}${path}`, query);
        } else {
            return redirect(307, `/${app.i18n.defaultLocale.substring(0, 2)}${path}`, query);
        }
    } else {
        // URL has locale code. Store it somewhere.
        const previousLocaleCode = path.substring(1, 3);
        app.$cookies.set('previous_locale_code', previousLocaleCode);
    }
}