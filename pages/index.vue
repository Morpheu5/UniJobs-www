<template>
    <div id="jobs_list" class="mb-5">
        <b-row>
            <b-col>
                <!-- List of jobs -->
                <b-row :class="`mt-0 mt-lg-3 py-3 job ${i === jobsTable.length-1 && 'last'}`" v-show="jobsTable.length > 0" v-for="(job, i) in jobsTable" :key="job.id">
                    <b-col cols="12" md="8">
                        <p class="description"><nuxt-link :to="localePath({ name: 'jobs-id', params: { id: job.id }})">{{ job.description }}</nuxt-link></p>
                        <p class="employer" v-html="$options.filters.formatPath(job.employer)"></p>
                    </b-col>
                    <b-col cols="12" md="4">
                        <p class="job_title">{{ job.job_title }}</p>
                        <p class="sectors">
                            <b-badge variant="primary" v-for="s in job.contest_sector" :key="s">{{ s }}</b-badge>
                            <b-badge variant="primary" v-for="s in job.scientific_sector" :key="s">{{ s }}</b-badge>
                        </p>
                        <p class="deadline" v-if="job.deadline"><fa :icon="['far', 'calendar-alt']" class="mr-2 text-muted" /> {{ job.deadline | formatDeadline($i18n.locale) }}</p>
                    </b-col>
                </b-row>
                <!-- No jobs -->
                <b-row v-show="jobsTable.length == 0">
                    <b-col lg="8" offset-lg="2">
                        <h3>{{ $t('jobs_list.no_jobs_h') }} 😱 <nuxt-link :to="localePath({ name: 'slug', params: { slug: 'help-us'} })"><fa :icon="['fas', 'arrow-circle-right']" class="ml-2 mr-3 small mb-1" />{{ $t('footer.help_us') }}!</nuxt-link></h3>
                        <p>{{ $t('jobs_list.no_jobs_message') }}</p>
                    </b-col>
                </b-row>

                <!-- Report a job -->
                <b-row class="mt-5">
                    <b-col lg="8" offset-lg="2">
                        <b-form novalidate @submit="reportJob">
                            <b-row>
                                <b-col>
                                    <h4>{{ $t('jobs_list.report_job_title') }}</h4>
                                    <p>{{ $t('jobs_list.report_job_message') }}</p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-input v-model="reportJobUrl" :placeholder="$t('jobs_list.report_placeholder')" />
                                </b-col>
                                <b-col lg="2" class="mt-3 mt-lg-0 text-right">
                                    <b-button variant="primary" type="submit">{{ $t('jobs_list.report_button') }}</b-button>
                                </b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col>
                                    <b-alert :show="reportJobOutcome === 'success'" variant="success" dismissible @dismissed="reportJobOutcome = false">
                                        {{ $t('jobs_list.report_success') }}
                                    </b-alert>
                                    <b-alert :show="reportJobOutcome === 'failure'" variant="warning" dismissible @dismissed="reportJobOutcome = false">
                                        {{ $t('jobs_list.report_failure') }}
                                    </b-alert>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" offset-md="0" lg="4" offset-lg="2">
                <div class="card-wrapper card-space mt-5 mt-lg-5">
                    <div class="card card-bg">
                        <div class="card-body">
                            <h5 class="card-title" v-if="currentLocale.iso == 'en-GB'">
                                Finding a job in the Italian academia can be hard. Searching for it should not be a nightmare too!
                            </h5>
                            <h5 class="card-title" v-if="currentLocale.iso == 'it-IT'">
                                Trovare un lavoro nell'accademia italiana può essere difficile. Cercarlo non dovrebbe essere un incubo, però!
                            </h5>
                            <nuxt-link :to="localePath({ name: 'slug', params: { slug: 'about'} })" class="read-more">
                                <span class="text">{{ $t('main_menu.about_us') }}</span>
                                <svg class="icon">
                                    <use :xlink:href="bispritesvg + '#it-arrow-right'" />
                                </svg>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col md="6" lg="4">
                <div class="card-wrapper card-space mt-5 mt-lg-5">
                    <div class="card card-bg">
                        <div class="card-body">
                            <h5 class="card-title" v-if="currentLocale.iso == 'en-GB'">
                                We'd love to hear from you! Please get in touch if you want to share your ideas, help us out, or just say hi!
                            </h5>
                            <h5 class="card-title" v-if="currentLocale.iso == 'it-IT'">
                                Vogliamo sapere cosa pensi! Contattaci se vuoi condividere un'idea, aiutarci, o anche solo per un saluto!
                            </h5>
                            <nuxt-link :to="localePath('contact')" class="read-more">
                                <span class="text">{{ $t('contact_page.title') }}</span>
                                <svg class="icon">
                                    <use :xlink:href="bispritesvg + '#it-arrow-right'" />
                                </svg>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss">
@import '@/assets/_custom_theme.scss';

#jobs_list {
    .job {
        border-bottom: 1px solid $gray-border;

        &.last {
            border-bottom: 0;
        }

        p {
            margin-bottom: $paragraph-margin-bottom/2;
        }

        .employer {
            .long_name {
                font-weight: bold;
            }

            .short_name:after {
                content: " › ";
            }
        }

        .description {
            a {
                font-weight: bold;
            }
        }
    }
}

.card {
    img {
        background-color: red;
        background-blend-mode: multiply;
    }
}
</style>


<script>
export default {
    head() {
        const description = {
            it: 'Offerte di lavoro nella Ricerca in Italia presentate in modo chiaro.',
            en: 'Research job offers in Italy, presented clearly.'
        }[this.currentLocale.code];
        return {
            title: `UniJobs.it — ${this.$t('headline')}`,
            meta: [
                { name: 'description', hid: 'description', content: description },
                { name: 'og:description', content: description }
            ]
        };
    },
    filters: {
        formatPath(path) {
            return path ? path.map((e, i, a) => (i < a.length-1 ? `<span class="short_name">${e.name}</span>` : `<span class="name long_name">${e.name}</span>`)).join('') : '';
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
                timeZoneName: 'short',
            });
        },
        formatTags(tags) {
            return tags ? tags.map(tag => `<b-badge pill variant="primary">${tag}</b-badge>`) : '';
        }
    },
    data() {
        return {
            fields: [
                { key: 'description', label: this.$t('jobs_list.description_h') },
                { key: 'job_title', label: this.$t('jobs_list.job_title_h') },
                { key: 'employer', label: this.$t('jobs_list.employer_h'), class: "employer organization", formatter: this.$options.filters.formatPath },
                { key: 'scientific_sector', label: this.$t('jobs_list.scientific_sector_h') },
                { key: 'deadline', label: this.$t('jobs_list.deadline_h'), formatter: this.$options.filters.formatDeadline },
            ],
            searchFilters: {
                description: '',
                employer: '',
                include_expired: false,
            },
            reportJobUrl: '',
            reportJobOutcome: false,
        };
    },
    computed: {
        jobsTable() {
            return this.jobs.map(job => ({
                id: job.id,
                description: job.title[this.$i18n.locale],
                contest_sector: Array.isArray(job.metadata.contest_sector) ? job.metadata.contest_sector : [job.metadata.contest_sector],
                scientific_sector: Array.isArray(job.metadata.scientific_sector) ? job.metadata.scientific_sector : [job.metadata.scientific_sector],
                job_title: job.metadata.job_title ? this.$t(`job_titles.${job.metadata.job_title}`) : (job.metadata.job_title_alt ? job.metadata.job_title_alt[this.$i18n.locale].content : ''),
                employer: job.organization.ancestors.length > 1 ? job.organization.ancestors.slice(1) : job.organization.ancestors,
                deadline: job.metadata.deadline,
            })).filter(this.filterTable);
        }
    },
    asyncData({ app, _params, error }) {
        return app.$axios
            .get('/api/contents?content_type=job')
            .then(res => {
                return { jobs: res.data };
            })
            .catch(e => {
                if (e.response) {
                    error({ statusCode: e.response.data.status, message: e.response.data.error });
                } else {
                    error({ statusCode: 500, message: `${e.code} ${e.address}:${e.port}` });
                }
            });
    },
    methods: {
        filterTable(job, _index, _jobs) {
            // FIXME The employer part needs tokenization. Perhaps build another function.
            return job.description.includes(this.searchFilters.description.toLocaleLowerCase())
                   && (job.employer.some(e => e.name.toLocaleLowerCase().includes(this.searchFilters.employer.toLocaleLowerCase())
                      || e.short_name.toLocaleLowerCase().includes(this.searchFilters.employer.toLocaleLowerCase())))
                   && (new Date(job.deadline) >= new Date() || this.searchFilters.include_expired);
        },
        reportJob(e = null) {
            if (null !== e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.reportJobUrl === '') {
                return;
            }
            this.$axios.post('/api/job_reporting', { data: { url: this.reportJobUrl } })
                .then(_response => {
                    this.reportJobOutcome = 'success';
                    this.reportJobUrl = '';
                })
                .catch(_error => {
                    this.reportJobOutcome = 'failure';
                });
            return false;
        }
    }
};
</script>

