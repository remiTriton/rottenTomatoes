<template>

  <div>
    <navBar v-on:search-movie="searchMovie" />

    <v-container>
      <h1>Register</h1>
      <UserAuthForm
        buttonText="Register"
        :submitForm="registerUser"
        hasName="true"
      />
    </v-container>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'

import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    navBar,

    UserAuthForm,
  },
  methods: {
    async registerUser(registrationInfo) {
      await this.$axios.post('/api/users/new', registrationInfo)
      this.$auth.loginWith('local', {
        data: registrationInfo,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style> 