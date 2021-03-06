<template>
    <div>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <div>
                    <h2 class="mb-5">
                        <a v-if="loggedIn && ['ADMIN', 'EDITOR'].includes(userRole)" :href="editorUrl"><small><fa :icon="['fas', 'edit']" size="lg" /></small></a>
                        {{ content.title[currentLocale.code] }}
                    </h2>
                    <section class="content-description">
                        <ContentBlock
                            v-for="block in content.content_blocks"
                            :key="`${content.id}-${block.id}`"
                            :type="block.block_type"
                            :locale="currentLocale"
                            :data="block"
                        />
                    </section>
                </div>
            </b-col>
        </b-row>
        <b-row class="clearfix" style="display: block">
            <b-col>
                <adsbygoogle ad-slot="5861780748" style="max-height: 90px" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import ContentBlock from '~/components/ContentBlock';

import _truncate from 'lodash/truncate';

export default {
    components: {
        ContentBlock
    },
    asyncData({ app, error, params }) {
        return app.$axios
            .get(`/contents/slug/${params.slug}`)
            .then(res => {
                return { content: res.data };
            })
            .catch(e => {
                if (e.response) {
                    error({ statusCode: e.response.data.status, message: e.response.data.error });
                } else {
                    error({ statusCode: 500, message: `${e.code} ${e.address}:${e.port}` });
                }
            });
    },
    computed: {
        description() {
            const l = this.currentLocale.code;
            return _truncate(`${this.content.content_blocks[0].body[l].content}`, { length: 200, omission: '…', separator: ' ' }).replace(/[\n\r]/gm, ' ');
        },
        editorUrl() {
            return `${process.env.editorBaseUrl}/contents/${this.content.id}/edit`;
        }
    },
    head() {
        return {
            title: this.content.title[this.currentLocale.code] + " — UniJobs.it",
            meta: [
                { name: 'description', hid: 'description', content: this.description },
                { name: 'og:title', content: this.content.title[this.currentLocale.code] },
                { name: 'og:description', content: this.description },
                { name: 'og:type', content: 'website' },
                { name: 'og:url', content: `https://www.unijobs.it${this.localePath({ name: 'slug', params: { slug: this.$route.params.slug } })}` },
                { name: 'og:locale', content: this.currentLocale.iso.replace('-', '_') },
                { name: 'twitter:site', content: '@unijobsit' },
                { name: 'twitter:card', content: 'summary' }
            ]
        };
    }
};
</script>
