<template>
    <b-row>
        <b-col>
            <div>
                <b-badge v-if="isExpired" variant="danger text-white" pill>{{ $t('job_page.meta.deadline_expired') }}</b-badge>
                <aside class="heading-organization">{{ job.organization.ancestors.slice(1) | formatPathLong }}</aside>
                <h2 class="mb-5">
                    {{ job.title[currentLocale.code] }}
                </h2>

                <section class="job-description">
                    <p><span v-if="job.metadata.contest_sector" class="mr-5">{{ $t('job_page.meta.contest_sector') }}: <strong>{{ job.metadata.contest_sector }}</strong></span>
                       <span v-if="job.metadata.scientific_sector">{{ $t('job_page.meta.scientific_sector') }}: <strong>{{ job.metadata.scientific_sector }}</strong></span>
                    </p>
                    <ContentBlock
                        v-for="block in job.content_blocks"
                        :key="`${job.id}-${block.id}`"
                        :type="block.block_type"
                        :locale="currentLocale"
                        :data="block"
                    />
                </section>
            </div>
        </b-col>
        <b-col lg="4" class="small">
            <h4 class="mb-3">{{ $t('job_page.meta.at_a_glance') }}</h4>
            <p v-if="job.metadata.job_title">{{ $t('job_page.meta.job_title') }}: <strong>{{ job.metadata.job_title[currentLocale.code].content }}</strong></p>
            <!-- <p>{{ $t('job_page.meta.institution') }}:<strong>{{ job.organization.ancestors.slice(1) | formatPath }}</strong></p> -->
            <p v-if="job.metadata.salary">{{ $t('job_page.meta.salary') }}: <strong>&euro; {{ job.metadata.salary }}</strong><span v-if="job.metadata.tax_status"> ({{ $t(`job_page.meta.tax_status.${job.metadata.tax_status}`) }})</span></p>
            <p v-if="job.metadata.deadline" :class="isExpired ? 'text-danger' : ''">
                {{ $t('job_page.meta.deadline') }}: <strong>{{ job.metadata.deadline | formatDeadline(currentLocale) }}</strong>
            </p>
            <p><b-button :href="job.metadata.url[currentLocale.code].content" size="sm" variant="primary">{{ $t('job_page.meta.application_call_btn') }}</b-button></p>
            <p v-if="isExpired"><b-badge variant="warning text-white" pill>{{ $t('warning') }}</b-badge> {{ $t('job_page.meta.deadline_expired_explanation') }}</p>
        </b-col>
    </b-row>
</template>

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
                { name: 'og:url', content: `https://www.unijobs.it${this.localePath({ name: 'jobs-id', params: { id: this.job.id }})}` },
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
            return `
                ${this.$options.filters.formatPathLong([this.job.organization.ancestors.slice(1)[0]])}
                ${{en:'seeks a', it:'cerca un/a'}[l]} ${this.job.metadata.job_title[l].content}
                (${{en:'sector', it:'settore'}[l]} ${this.job.metadata.contest_sector} ${this.job.metadata.scientific_sector},
                ${{en:'deadline', it:'scadenza'}[l]} ${this.$options.filters.formatDeadline(this.job.metadata.deadline, this.currentLocale)})
                ${_truncate(this.job.content_blocks[0].body[l].content, { length: 200, omission: ' …', separator: ' ' })}
            `.replace(/[\n\r]/gm, ' ').replace(/\s\s*/gm, ' ').trim();
        }
    },
    validate({ params }) {
        return /^\d+$/.test(params.id);
    },
    async asyncData({ app, params }) {
        const jobResponse = await app.$axios.get(`/api/contents/${params.id}?content_type=job`).catch(e => { console.log(e); });
        return { job: jobResponse.data };
    }
};
</script>
