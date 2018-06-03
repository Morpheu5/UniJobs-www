<template>
  <section>
    <div>
      <p>The thing with jobs.</p>
      <ul>
        <li v-for="job in jobs" :key="job.id">{{ job.title }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import JobsList from '~/components/JobsList'

export default {
  components: {
    JobsList
  },
  async asyncData ({ app, params }) {
    let [ jobsResponse ] = await Promise.all([
      app.$axios.get('/jobs')
    ])
    return { jobs: jobsResponse.data }
  }
}
</script>

