<template>
    <b-row>
        <b-col>
            <div>
                <h2 class="mb-5">{{ job.title[currentLocale.code] }}</h2>
                <section class="job-description">
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
        <b-col cols="4">
            <b-card>
            <h4>At a glance</h4>
            <p v-if="job.metadata.job_title">Job title: <strong>{{ job.metadata.job_title[currentLocale.code].content }}</strong></p>
            <p>Institution: <strong>{{ job.organization.ancestors.slice(1) | formatPath }}</strong></p>
            <p v-if="job.metadata.salary">Salary: <strong>&euro; {{ job.metadata.salary }}</strong><span v-if="job.metadata.tax_status"> ({{ job.metadata.tax_status }})</span></p>
            <b-button :href="job.metadata.url[currentLocale.code].content" size="sm" variant="primary">Apply here!</b-button>
            </b-card>
        </b-col>

    </b-row>
</template>

<script>
import ContentBlock from '~/components/ContentBlock'

export default {
    components: {
        ContentBlock
    },
    filters: {
        formatPath(path) {
            return path ? path.map((e, i, a) => (i < a.length-1 ? e.short_name : e.name)).join(' › ') : '';
        }
    },
    validate({ params }) {
        return /^\d+$/.test(params.id)
    },
    async asyncData({ app, params }) {
        const jobResponse = await app.$axios.get(`/contents/${params.id}?content_type=job`).catch(e => { console.log(e) })
        return { job: jobResponse.data }
    }
}
</script>
