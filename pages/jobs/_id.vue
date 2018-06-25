<template>
    <b-row>
        <b-col>
            <div>
                <h2>{{ job.title[currentLocale.code] }}</h2>
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
            <p>Position: <strong>Research Assistant</strong></p>
            <p>Institution: <strong>Università del Pavè</strong></p>
            <p>Salary: <strong>&euro; 20.000 - 25.000</strong> (gross)</p>
            <b-button href="#" size="sm" variant="primary">Apply here!</b-button>
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
    validate ({ params }) {
        return /^\d+$/.test(params.id)
    },
    async asyncData ({ app, params }) {
        let jobResponse = await app.$axios.get(`/contents/${params.id}?content_type=job`).catch(e => { console.log(e) })
        return { job: jobResponse.data }
    }
}
</script>
