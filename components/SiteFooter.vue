<template>
    <div id="site_footer">
        <b-container class="py-4">
            <b-row>
                <b-col cols="3" class="link-list-wrapper">
                    <ul class="link-list">
                        <li><nuxt-link :to="localePath({ name: 'slug', params: { slug: 'privacy'} })" class="text-white">{{ $t('footer.privacy') }}</nuxt-link></li>
                        <li><nuxt-link :to="localePath({ name: 'slug', params: { slug: 'cookies'} })" class="text-white">{{ $t('footer.cookies') }}</nuxt-link></li>
                    </ul>
                </b-col>
                <b-col cols="3" class="link-list-wrapper">
                    <ul class="link-list">
                        <li><nuxt-link :to="localePath({ name: 'slug', params: { slug: 'contact'} })" class="text-white">{{ $t('footer.contact') }}</nuxt-link></li>
                        <li><nuxt-link :to="localePath({ name: 'slug', params: { slug: 'help-us'} })" class="text-white">{{ $t('footer.help_us') }}</nuxt-link></li>
                    </ul>
                </b-col>
                <b-col cols="6">
                    <p><small v-html="$t('footer.content_license')" /></p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/_custom_theme.scss';

#site_footer {
    border-top: 1px solid #eee;
    color: theme-color('light');
}
</style>
