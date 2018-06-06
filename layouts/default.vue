<template>
  <div class="default.vue">
    <SiteHeader/>
    <MainNav/>
    <b-container>
      <nuxt/>
    </b-container>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader'
import MainNav from '~/components/MainNav'

export default {
  components: {
    SiteHeader,
    MainNav
  },
  created: () => {
    // console.log(this.switchLocalePath('en'))
  }
}
</script>

<style lang="scss">
@import '@/assets/_custom_theme.scss';

</style>
