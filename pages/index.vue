<template>
    <div id="jobs_list" class="mb-5">
        <b-row>
            <b-col>
                <b-alert v-if="currentLocale.iso == 'en-GB'" variant="danger" show>
                    <h4>PLEASE READ: UniJobs.it is on holiday</h4>
                    <p>
                        This website has been running semi-manually for the
                        past few months, and it has reached a reasonable amount
                        of people from such a cold start.
                    </p>
                    <p>
                        There is a <a href="https://blog.morpheu5.net/unijobs-it-e-le-cose-che-si-imparano/">blog post</a>
                        that explains how this website came about. It is in
                        Italian only, but you would be surprised how good
                        Google Translate has become &mdash; how did you think
                        the job offers were translated from Italian otherwise? 😉
                    </p>
                    <p>
                        UniJobs.it should return at some point in January, but
                        it will suffer from the same pains detailed in that blog.
                        If you can help, or have any ideas to improve the running
                        of the website, please feel free to get in touch!
                    </p>
                    <b-button
                        :to="localePath({ name: 'slug', params: { slug: 'help-us'} })"
                        variant="primary">
                        Get in touch
                    </b-button>
                </b-alert>
                <b-alert v-if="currentLocale.iso == 'it-IT'" variant="danger" show>
                    <h4>IMPORTANTE: UniJobs.it va in vacanza</h4>
                    <p>
                        Questo sito ha funzionato in modo semi-manuale negli
                        ultimi mesi, e ha raggiunto un numero di persone più
                        che ragionevole, considerando la partenza a freddo.
                    </p>
                    <p>
                        C'è un <a href="https://blog.morpheu5.net/unijobs-it-e-le-cose-che-si-imparano/">post</a>
                        che spiega l'origine di questo sito. È in italiano, ma
                        sareste sorpresi dallo scoprire quanto bene funziona
                        Google Translate &mdash; come pensavate che venissero
                        tradotti i bandi dall'italiano all'inglese altrimenti? 😉
                    </p>
                    <p>
                        UniJobs.it dovrebbe tornare operativo da gennaio, ma
                        avrà gli stessi problemi che sono descritti in quel
                        post. Se potete dare una mano, o se avete idee per
                        migliorare la gestione di questo sito, siete più che
                        benvenuti!
                    </p>
                    <b-button
                        :to="localePath({ name: 'slug', params: { slug: 'help-us'} })"
                        variant="primary">
                        Contattaci
                    </b-button>
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <!-- List of jobs -->
                <b-row :class="`mt-0 mt-lg-3 py-3 job ${i === jobsTable.length-1 && 'last'}`" v-show="jobsTable.length > 0" v-for="(job, i) in jobsTable" :key="job.id">
                    <b-col cols="3" md="1" order="2" order-md="1">
                        <b-img v-if="job.logo_url" fluid rounded :src="job.logo_url | cdnUrl" />
                    </b-col>
                    <b-col cols="9" md="8" order="1" order-md="2">
                        <p class="description"><nuxt-link :to="localePath({ name: 'jobs-id', params: { id: job.id }})">{{ job.description }}</nuxt-link></p>
                        <p class="employer" v-html="$options.filters.formatPath(job.employer)"></p>
                    </b-col>
                    <b-col cols="12" md="3" order="3" order-md="3">
                        <p class="job_title">{{ job.job_title }}</p>
                        <p class="sectors">
                            <b-badge class="mr-1" variant="primary" v-for="s in job.contest_sector" :key="s">{{ s }}</b-badge>
                            <b-badge class="mr-1" variant="primary" v-for="s in job.scientific_sector" :key="s">{{ s }}</b-badge>
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
        <!-- <b-row class="clearfix" style="display: block">
            <b-col>
                <adsbygoogle ad-slot="5861780748" style="max-height: 90px" />
            </b-col>
        </b-row> -->
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
    asyncData({ app, _params, error }) {
        return app.$axios
            .get('/contents?content_type=job')
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
            return this.jobs.map(job => {
                const l = this.$i18n.locale;
                let job_title = '?';
                if (job.metadata.job_title) {
                    job_title = this.$t(`job_titles.${job.metadata.job_title}`);
                } else {
                    if (job.metadata.job_title_alt && job.metadata.job_title_alt[l]) {
                        job_title = job.metadata.job_title_alt[l].content || '?!';
                    }
                }
                return {
                    id: job.id,
                    description: job.title[this.$i18n.locale],
                    contest_sector: Array.isArray(job.metadata.contest_sector) ? job.metadata.contest_sector : [job.metadata.contest_sector],
                    scientific_sector: Array.isArray(job.metadata.scientific_sector) ? job.metadata.scientific_sector : [job.metadata.scientific_sector],
                    job_title: job_title,
                    employer: job.organization.ancestors.length > 1 ? job.organization.ancestors.slice(1) : job.organization.ancestors,
                    logo_url: job.organization.logo_url || job.organization.ancestors.map(a => a.logo_url).filter(u => u).reverse()[0],
                    deadline: job.metadata.deadline,
                };
            }).filter(this.filterTable).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        }
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
            this.$axios.post('/job_reporting', { data: { url: this.reportJobUrl } })
                .then(_response => {
                    this.reportJobOutcome = 'success';
                    this.reportJobUrl = '';
                })
                .catch(_error => {
                    this.reportJobOutcome = 'failure';
                });
            return false;
        }
    },
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
    }
};
</script>

