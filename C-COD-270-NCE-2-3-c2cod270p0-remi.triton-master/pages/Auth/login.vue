<template>

<div>
    <navBar v-on:search-movie="searchMovie" />
  <v-container class='LO'>

    <h1>Login</h1>

    <UserAuthForm buttonText='Login' :submitForm='loginUser' />
  </v-container>
</div>
</template>


<script>
import navBar from '@/components/navBar.vue'

  import UserAuthForm from '@/components/UserAuthForm'
  
  export default {
    components: {
          navBar,

      UserAuthForm
    },
    methods: {
      loginUser(userInfo){
                  console.log(userInfo)
        this.$auth.loginWith('local', {
          data: userInfo
        })
      }}}

</script>

<style scoped>
.LO{
  width:250px;
}
</style>

