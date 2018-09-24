<template>
    <div id="site_footer">
        <b-container class="py-4">
            <b-row>
                <b-col class="link-list-wrapper">
                    <ul class="link-list">
                        <li><a href="/about" class="text-white">{{ $t('main_menu.about_us') }}</a></li>
                        <li><a href="/privacy" class="text-white">{{ $t('footer.privacy') }}</a></li>
                        <li><a href="/contact" class="text-white">{{ $t('footer.contact') }}</a></li>
                    </ul>
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
