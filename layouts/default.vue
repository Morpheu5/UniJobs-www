<template>
    <div class="default layout">
        <CookieBanner/>
        <SiteHeader/>
        <MainNav/>
        <div class="page-sheet py-5">
            <b-container>
                <nuxt/>
            </b-container>
        </div>
        <SiteFooter/>
    </div>
</template>

<script>
import CookieBanner from '~/components/CookieBanner';
import SiteHeader from '~/components/SiteHeader';
import MainNav from '~/components/MainNav';
import SiteFooter from '~/components/SiteFooter';

export default {
    components: {
        CookieBanner,
        SiteHeader,
        MainNav,
        SiteFooter
    }
};
</script>

<style lang="scss">
@import '@/assets/_custom_theme.scss';

body {
    background: theme-color('secondary');

    .page-sheet {
        background: white;
    }
}
</style>
