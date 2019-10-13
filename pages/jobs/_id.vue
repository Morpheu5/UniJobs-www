<template>
    <b-row>
        <b-col>
            <div>
                <b-badge v-if="isExpired" variant="danger text-white" pill>{{ $t('job_page.meta.deadline_expired') }}</b-badge>
                <aside class="heading-organization"><strong>{{ job.organization.ancestors.slice(1) | formatPathLong }}</strong></aside>
                <h2 class="mb-2 mb-md-5">
                    <a v-if="loggedIn && ['ADMIN', 'EDITOR'].includes(userRole)" :href="editorUrl"><small><fa :icon="['fas', 'edit']" size="lg" /></small></a>
                    {{ job.title[currentLocale.code] }}
                </h2>

                <section class="job-description">
                    <b-row align-v="start">
                        <b-col>
                            <p>
                                <big v-if="job.metadata.contest_sector && Array.isArray(job.metadata.contest_sector)" v-show="job.metadata.contest_sector.length > 0">
                                    <b-badge class="mr-1" variant="primary" v-for="s in job.metadata.contest_sector" :key="s">{{ s }}</b-badge>
                                </big>
                                <big v-else>
                                    <b-badge class="mr-1" variant="primary">{{ job.metadata.contest_sector }}</b-badge>
                                </big>
                                <big v-if="job.metadata.scientific_sector && Array.isArray(job.metadata.scientific_sector)" v-show="job.metadata.scientific_sector.length > 0">
                                    <b-badge class="mr-1" variant="primary" v-for="s in job.metadata.scientific_sector" :key="s">{{ s }}</b-badge>
                                </big>
                                <big v-else>
                                    <b-badge class="mr-1" variant="primary">{{ job.metadata.scientific_sector }}</b-badge>
                                </big>
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <ContentBlock
                                v-for="block in job.content_blocks"
                                :key="`${job.id}-${block.id}`"
                                :type="block.block_type"
                                :locale="currentLocale"
                                :data="block"
                            />
                        </b-col>
                    </b-row>
                </section>
            </div>
        </b-col>
        <b-col lg="4" class="small">
            <no-ssr>
                <aside class="social-share mt-1 mt-md-2">
                    <social-sharing :url="this.canonicalUrl"
                                    :title="this.job.title[this.currentLocale.code]"
                                    :description="this.description"
                                    :hashtags="this.hashtags"
                                    inline-template>
                        <div>
                            <network network="twitter" class="">
                                <fa :icon="['fab', 'twitter']" size="lg" />
                            </network>
                            <network network="facebook" class="">
                                <fa :icon="['fab', 'facebook']" size="lg" />
                            </network>
                            <network network="linkedin" class="">
                                <fa :icon="['fab', 'linkedin']" size="lg" />
                            </network> 
                            <network network="email" class="">
                                <fa :icon="['far', 'envelope']" size="lg" />
                            </network>
                        </div>
                    </social-sharing>
                </aside>
            </no-ssr>
            <h4 class="mb-3">{{ $t('job_page.meta.at_a_glance') }}</h4>
            <p v-if="jobTitle">{{ $t('job_page.meta.job_title') }}: <strong>{{ jobTitle }}</strong></p>
            <p v-if="job.metadata.salary">{{ $t('job_page.meta.salary') }}: <strong>&euro; {{ job.metadata.salary }}</strong><span v-if="job.metadata.tax_status"> ({{ $t(`job_page.meta.tax_status.${job.metadata.tax_status}`) }})</span></p>
            <p v-if="job.metadata.deadline" :class="isExpired ? 'text-danger' : ''">
                {{ $t('job_page.meta.deadline') }}: <strong>{{ job.metadata.deadline | formatDeadline(currentLocale) }}</strong>
            </p>
            <p><b-button :href="job.metadata.url[currentLocale.code].content" size="sm" variant="primary">{{ $t('job_page.meta.application_call_btn') }}</b-button></p>
            <p v-if="isExpired"><b-badge variant="warning text-white" pill>{{ $t('warning') }}</b-badge> {{ $t('job_page.meta.deadline_expired_explanation') }}</p>

            <adsbygoogle ad-slot="7400247216" />
        </b-col>
    </b-row>
</template>

<style lang="scss">
.social-share {
    text-align: right;
    float: right;

    span[data-link] {
        padding: 0 0.5rem;
    }

    [data-icon="twitter"] {
        color: #1da1f2;
    }

    [data-icon="facebook"] {
        color: #3C5A99;
    }
    
    [data-icon="linkedin"] {
        color: #0077B5;
    }
    
    [data-icon="envelope"] {
        color: lightslategray;
    }
}
</style>


<script>
import ContentBlock from '~/components/ContentBlock';

import _truncate from 'lodash/truncate';

export default {
    components: {
        ContentBlock
    },
    head() {
        return {
            title: this.job.title[this.currentLocale.code] + " — UniJobs.it",
            meta: [
                { name: 'description', hid: 'description', content: this.description },
                { name: 'og:title', content: this.job.title[this.currentLocale.code] },
                { name: 'og:description', content: this.description },
                { name: 'og:type', content: 'website' },
                { name: 'og:url', content: this.canonicalUrl },
                { name: 'og:locale', content: this.currentLocale.iso.replace('-', '_') },
                { name: 'twitter:site', content: '@unijobsit' },
                { name: 'twitter:card', content: 'summary' }
            ]
        };
    },
    filters: {
        formatPath(path) {
            return path ? path.map((e, i, a) => (i < a.length-1 ? e.short_name : e.name)).join(' › ') : '';
        },
        formatPathLong(path) {
            return path ? path.map(e => e.name).join(' › ') : '';
        },
        formatDeadline(d, locale) {
            let date = new Date(d);
            return date.toLocaleString(locale.iso, {
                hour12: false,
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
        }
    },
    computed: {
        isExpired() {
            let today = new Date();
            let deadline = new Date(this.job.metadata.deadline);
            return today >= deadline;
        },
        description() {
            const l = this.currentLocale.code;
            const contest_sector = Array.isArray(this.job.metadata.contest_sector) ? this.job.metadata.contest_sector.join(',') : this.job.metadata.contest_sector;
            const scientific_sector = Array.isArray(this.job.metadata.scientific_sector) ? this.job.metadata.scientific_sector.join(',') : this.job.metadata.scientific_sector;
            const sectors = [contest_sector, scientific_sector].filter(item => item !== '').join(',');
            const sectors_text = sectors !== '' ? `${{en:'sector', it:'settore'}[l]} ${sectors}, ` : '';
            return `
                ${this.$options.filters.formatPathLong([this.job.organization.ancestors.length > 1 ? this.job.organization.ancestors.slice(1)[0] : this.job.organization.ancestors])}
                ${{en:'seeks a', it:'cerca un/a'}[l]} ${this.jobTitle}
                (${sectors_text}${{en:'deadline', it:'scadenza'}[l]} ${this.$options.filters.formatDeadline(this.job.metadata.deadline, this.currentLocale)})
                ${this.job.content_blocks.length > 0 && _truncate(this.job.content_blocks[0].body[l].content, { length: 200, omission: '…', separator: ' ' })}
            `.replace(/[\n\r]/gm, ' ').replace(/\s\s*/gm, ' ').trim();
        },
        canonicalUrl() {
            return `https://www.unijobs.it${this.localePath({ name: 'jobs-id', params: { id: this.job.id }})}`;
        },
        hashtags() {
            let hashtags = [this.job.organization.ancestors.length > 1 ? this.job.organization.ancestors[1].short_name : this.job.organization.ancestors[0].short_name, 'UniJobs'];
            let localeHashtags = {
                it: ['ricerca', 'lavoro', 'Italia', 'AcademicTwitter'],
                en: ['research', 'jobs', 'Italy', 'EU', 'AcademicTwitter']
            }[this.$i18n.locale];
            return [...hashtags, ...localeHashtags].filter((item, index, array) => array.indexOf(item) == index).join(',');
        },
        jobTitle() {
            if (this.job.metadata.job_title) {
                return this.$t(`job_titles.${this.job.metadata.job_title}`);
            } else if (this.job.metadata.job_title_alt) {
                return this.job.metadata.job_title_alt[this.$i18n.locale].content;
            } else {
                return null;
            }
        },
        editorUrl() {
            return `${process.env.editorBaseUrl}/contents/${this.job.id}/edit`;
        }
    },
    validate({ params }) {
        return /^\d+$/.test(params.id);
    },
    asyncData({ app, params, error }) {
        return app.$axios
            .get(`/contents/${params.id}?content_type=job`)
            .then(res => {
                return { job: res.data };
            })
            .catch(e => {
                if (e.response) {
                    error({ statusCode: e.response.data.status, message: e.response.data.error });
                } else {
                    error({ statusCode: 500, message: `${e.code} ${e.address}:${e.port}` });
                }
            });
    }
};
</script>
