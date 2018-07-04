<template>
  <b-row>
    <b-col>
      <div>
        <p>The thing with jobs.</p>
        <ul>
          <li v-for="job in jobs" :key="job.id">
            <nuxt-link :to="localePath({ name: 'jobs-id', params: { id: job.id }})">{{ job.title[$i18n.locale] }}</nuxt-link>
          </li>
        </ul>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import JobsList from '~/components/JobsList'

export default {
  components: {
    JobsList
  },
  async asyncData ({ app, params }) {
    const [ jobsResponse ] = await Promise.all([
      app.$axios.get('/contents?content_type=job')
    ])
    return { jobs: jobsResponse.data }
  }
}
</script>

