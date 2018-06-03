<template>
  <div class="default.vue">
    <SiteHeader/>
    <MainNav/>
    <nuxt/>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader'
import MainNav from '~/components/MainNav'

export default {
  components: {
    SiteHeader,
    MainNav
  }
}
</script>

<style lang="scss">

</style>
