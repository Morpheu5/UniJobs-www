<template>
    <div id="jobs_list" class="mb-5">
        <b-row>
            <b-col>

                <!-- List of jobs -->
                <b-row class="mt-0 mt-lg-3">
                    <b-col v-if="jobsTable.length > 0">
                        <b-table id="jobs_list_table" :items="jobsTable" :fields="fields" :filter="filterTable" sort-by="deadline" sort-asc stacked="md" small>
                            <span slot="employer" slot-scope="data" v-html="data.value" />
                            <nuxt-link slot="description" slot-scope="data" :to="localePath({ name: 'jobs-id', params: { id: data.item.id }})">{{ data.value }}</nuxt-link>
                        </b-table>
                    </b-col>

                    <!-- No jobs -->
                    <b-col lg="8" offset-lg="2" v-else>
                        <h3>{{ $t('jobs_list.no_jobs_h') }} 😱 <a :href="localePath({ name: 'slug', params: { slug: 'help-us'} })"><fa :icon="['fas', 'arrow-circle-right']" class="ml-2 mr-3 small mb-1" />{{ $t('footer.help_us') }}!</a></h3>
                        <p>{{ $t('jobs_list.no_jobs_message') }}</p>
                    </b-col>
                </b-row>

                <!-- Report a job -->
                <b-row class="mt-3">
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
                <b-card class="mt-5 mt-lg-5">
                    <p v-if="currentLocale.iso == 'en-GB'">
                        Finding a job in the Italian academia can be hard. Searching for it should not be a nightmare too!
                    </p>
                    <p v-if="currentLocale.iso == 'it-IT'">
                        Trovare un lavoro nell'accademia italiana può essere difficile. Cercarlo non dovrebbe essere un incubo, però!
                    </p>
                    <b-btn :href="localePath({ name: 'slug', params: { slug: 'about'} })" variant="primary" class="mt-4">{{ $t('main_menu.about_us') }} ›</b-btn>
                </b-card>
            </b-col>
            <b-col md="6" lg="4">
                <b-card class="mt-5 mt-lg-5">
                    <p v-if="currentLocale.iso == 'en-GB'">
                        We'd love to hear from you! Please get in touch if you want to share your ideas, help us out, or just say hi!
                    </p>
                    <p v-if="currentLocale.iso == 'it-IT'">
                        Vogliamo sapere cosa pensi! Contattaci se vuoi condividere un'idea, aiutarci, o anche solo per un saluto!
                    </p>
                    <b-btn :href="localePath('contact')" variant="primary" class="mt-4">{{ $t('contact_page.title') }} ›</b-btn>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss">
@import '@/assets/_custom_theme.scss';

#jobs_list {
    #jobs_list_table {
        @include media-breakpoint-down(sm) {
            tr {
                border-bottom: 2px solid $table-border-color;
                padding-top: 1.5em;
            }
        }

        @include media-breakpoint-up(md) {
            td {
                vertical-align: bottom;
            }
        }

        .employer {
            .long_name {
                font-weight: bold;
                display: block;
            }

            .short_name {
                font-size: small;
            }

            .short_name:after {
                content: " › ";
            }
        }
    }

    .card {
        img {
            background-color: red;
            background-blend-mode: multiply;
        }
    }
}
</style>


<script>
export default {
    filters: {
        formatPath(path) {
            return path ? path.map((e, i, a) => (i < a.length-1 ? `<span class="short_name">${e.short_name}</span>` : `<span class="name long_name">${e.name} (${e.short_name})</span>`)).join('') : '';
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
    async asyncData({ app, _params }) {
        const [ jobsResponse ] = await Promise.all([
            app.$axios.get('/api/contents?content_type=job')
        ]);
        return { jobs: jobsResponse.data };
    },
    computed: {
        jobsTable() {
            return this.jobs.map(job => ({
                id: job.id,
                description: job.title[this.$i18n.locale],
                scientific_sector: job.metadata.scientific_sector,
                job_title: job.metadata.job_title[this.$i18n.locale].content,
                employer: job.organization.ancestors,
                deadline: job.metadata.deadline,
            }));
        }
    },
    methods: {
        filterTable(job, _index, _jobs) {
            // FIXME The employer part needs tokenization. Perhaps build another function.
            return job.description.includes(this.searchFilters.description)
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

