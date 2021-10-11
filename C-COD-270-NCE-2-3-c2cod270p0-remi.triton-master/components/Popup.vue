<template>
  <div>
    <div class="popup">
      <div class="popup-inner">
        <slot />
        <div class="flex flex-col justify-center popup-body">
          <div name="profile-email">
            <input v-model="update.username" class="card-subtitle mb-2" placeholder="Write a new username"/>
          </div>
          <div name="profile-email">
            <input v-model="update.email" class="card-subtitle mb-2" placeholder="Write a new email"/>
          </div>
          <div name="profile-email">
            <input v-model="update.password" class="card-subtitle mb-2" placeholder="Write a new password" />
          </div>
               <div name="profile-email">
            <input type='file' class="card-subtitle mb-2" placeholder="Upload your profile picture" />
          </div>
        </div>

        <div class="popup-btn">
          <div>
            <button class="bg-blue-500
                      active:bg-blue-600
                      uppercase
                      text-white
                      font-bold
                      hover:bg-blue-700
                      shadow
                      text-xs
                      px-4
                      py-2
                      rounded
                      sm:mr-2
                      mb-1  
                      mt-4
                      button" @click='updateProfile'>
              Update
            </button>
            <!-- <button type="submit" @click="update(this.$route.params.id)">Update</button> -->
          </div>
        </div>
       <slot />
        <button class="btn btn-primary popup-close"
        @click="$emit('close')"
        >Close Popup</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
// import bcrypt from 'bcrypt';


export default {
  //   props: ['id'],

  data: () => ({
    update: {}
  }),

  methods: {
     async updateProfile(){ 
      //  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(this.update.password, salt, (err, hash) => {
      //       this.update.password = hash;
      //       // //On l'enregistre là dans la DB
      //       // this.$auth.user.save()
      //     })
      //     )
      await axios.put('http://localhost:3000/api/users/update/' + this.$auth.user._id + '/', {
        "email": this.update.email,
        "username": this.update.username,
        "password": this.update.password
      })
      .then(alert("Modifications effetctuées")
      )
      // .catch(alert("Erreur dans la modification, réessayez"))
      console.log(this.$auth.user._id);
    }}
    }
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}
</style>