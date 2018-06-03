<template>
    <section class="job-card">
        <b-card no-body>
        <b-tabs bottom pills no-fade>
            <b-tab title="Language" disabled />

            <b-tab :title="l | flagify" class="job-translation" v-for="l in ['it', 'en']" :key="l">
                <div>
                    <h2>{{ job.body.title.find((e) => { return e.lang == l }).content }}</h2>
                    <section class="job-description">
                        <ContentPart
                            v-for="child in job.body.children"
                            :key="child.id"
                            :type="child.type"
                            :lang="l"
                            :data="child"
                            />
                    </section>
                </div>
            </b-tab>
        </b-tabs>
        </b-card>
    </section>
</template>

<script>
import ContentPart from '~/components/ContentPart'

export default {
    components: {
        ContentPart
    },
    validate ({ params }) {
        return /^\d+$/.test(params.id)
    },
    async asyncData ({ app, params }) {
        let jobResponse = await app.$axios.get(`/jobs/${params.id}`).catch(e => { console.log(e) })
        return { job: jobResponse.data }
    }
}
</script>
