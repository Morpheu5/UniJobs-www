<template>
    <div id="contact" class="mb-3">
        <b-row>
            <b-col lg="8" offset-lg="2">
                <h2>{{ $t('contact_page.title') }}</h2>
                <div v-html="$t('contact_page.message')" />
            </b-col>
        </b-row>
    </div>
</template>
