 <template>
  <v-form v-model="valid">
    <v-text-field v-model="userInfo.username" 
                  label="Username" 
                  :rules="[required('username')]"
                  v-if="hasName" />

    <v-text-field v-model="userInfo.email"
                  label="Email"
                  :rules="[required('email'), emailFormat()]"/>

    <v-text-field v-model="userInfo.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  counter=true
                  :rules="[required('password'), minLength('password', 8)]"
                  />

    <v-btn @click.prevent="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
   import validations from "@/utils/validations";

export default {
  name: 'login',
    data() {
      return {
        valid: false,
        showPassword: false,
        userInfo: {
          username:'',
          email: '',
          password: ''
        },
        ...validations
      }
    },
         props: ["submitForm", "buttonText", "hasName"]
   }

</script>
<style scoped>
v-form{
  width:300px;
}
</style>