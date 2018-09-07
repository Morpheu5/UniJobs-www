<template>
    <div id="jobs_list" class="mb-5">
        <b-row>
            <b-col>
                <b-row>
                    <b-col>
                        <!-- <h2>{{ $t('jobs_list.latest_jobs')}}</h2> -->
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group>
                            <b-input id="filter_description" v-model="search_filters.description" />
                            <label :class="search_filters.description != '' ? 'active' : null" for="filter_description">
                                {{ $t('jobs_list.description_h') }}
                            </label>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                            <b-input id="filter_employer" v-model="search_filters.employer" />
                            <label :class="search_filters.employer != '' ? 'active' : null" for="filter_employer">
                                {{ $t('jobs_list.employer_h') }}
                            </label>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3" class="mt-2">
                        <div class="form-check mt-4">
                            <input id="filter_include_expired" v-model="search_filters.include_expired" type="checkbox" />
                            <label for="filter_include_expired">
                                {{ $t('jobs_list.include_expired_h') }}
                            </label>
                        </div>
                    </b-col>
                </b-row>

                <b-row class="mt-5">
                    <b-col>
                        <b-table id="jobs_list_table" :items="jobsTable" :fields="fields" :filter="filterTable" sort-by="deadline" sort-desc>
                            <span slot="employer" slot-scope="data" v-html="data.value" />
                            <nuxt-link slot="description" slot-scope="data" :to="localePath({ name: 'jobs-id', params: { id: data.item.id }})">{{ data.value }}</nuxt-link>
                        </b-table>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<style lang="scss">
#jobs_list {
    #jobs_list_table {
        td {
            vertical-align: bottom;
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
}
</style>


<script>
import JobsList from '~/components/JobsList'

export default {
    components: {
        JobsList
    },
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
                { key: 'deadline', label: this.$t('jobs_list.deadline_h'), formatter: this.$options.filters.formatDeadline }
            ],
            search_filters: {
                description: '',
                employer: '',
                include_expired: false,
            }
        }
    },
    async asyncData({ app, _params }) {
        const [ jobsResponse ] = await Promise.all([
            app.$axios.get('/contents?content_type=job')
        ])
        return { jobs: jobsResponse.data }
    },
    computed: {
        jobsTable() {
            return this.jobs.map(job => ({
                id: job.id,
                description: job.title[this.$i18n.locale],
                job_title: job.metadata.job_title[this.$i18n.locale].content,
                employer: job.organization.ancestors,
                deadline: job.metadata.deadline,
            }))
        }
    },
    methods: {
        filterTable(job, index, jobs) {
            // FIXME The employer part needs tokenization. Perhaps build another function.
            return job.description.includes(this.search_filters.description)
                   && (job.employer.some(e => e.name.toLocaleLowerCase().includes(this.search_filters.employer.toLocaleLowerCase())
                      || e.short_name.toLocaleLowerCase().includes(this.search_filters.employer.toLocaleLowerCase())))
                   && (new Date(job.deadline) >= new Date() || this.search_filters.include_expired)
        }
    }
}
</script>

