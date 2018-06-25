<template lang="html">
    <b-navbar class="main-navbar" toggleable="sm" type="dark" variant="secondary">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item :href="localePath('index')">Home</b-nav-item>
                    <b-nav-item :href="localePath('about')">About Us</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!-- <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
                    </b-nav-form> -->
        
                    <b-nav-item-dropdown :text="currentLocale.name" right>
                        <b-dropdown-item v-for="locale in $i18n.locales" :key="locale.code" :href="switchLocalePath(locale.code)">{{ locale.name }}</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            User
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<style lang="scss" scoped>

</style>


<script>
console.log(this);
export default {
    methods: {

    },
    computed: {
        localeName: () => {
            return 'ahha'
        }
    }
}
</script>
