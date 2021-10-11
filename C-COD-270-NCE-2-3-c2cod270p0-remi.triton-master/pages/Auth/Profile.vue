<template>
<div>    <navBar v-on:search-movie="searchMovie" />

  <div class="profile">
    <main class="profile-page">
      <section class="relative block" style="height: 500px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover bg-yellow-300"
          style=""
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-10 bg-black"
          ></span>
        </div>
        <div
          class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
          "
          style="height: 70px"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-gray-300">
        <div class="container mx-auto px-4">
          <div
            class="
              relative
              flex flex-col
              min-w-0
              break-words
              bg-white
              w-full
              mb-6
              shadow-xl
              rounded-lg
              -mt-64
            "
          >
            <!-- Profile Card -->
            <div class="">
              <div class="flex flex-wrap justify-center">
                <div
                  class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                >
                  <div class="relative">
                    <img
                      alt=""
                      src="@/assets/avatar-png.png"
                      class="
                        shadow-xl
                        rounded-full
                        h-auto
                        align-middle
                        border-none
                        absolute
                        -m-16
                        -ml-20
                        
                      "
                      style="max-width: 150px"
                    />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 py-6 lg:order-3"></div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1"></div>
              </div>
              <!-- Profile Texts -->
              <div class="text-center mt-12">
                <h3
                  class="
                    text-4xl
                    font-semibold
                    leading-normal
                    mb-2
                    text-gray-800
                    mb-2
                  "
                >
                {{$auth.user.username}}
                </h3>
                <div
                  class="
                    text-sm
                    leading-normal
                    mt-0
                    mb-2
                    text-gray-500
                    font-bold
                    uppercase
                  "
                >
                  <i
                    class="fas fa-map-marker-alt mr-2 text-lg text-gray-500"
                  ></i>
                  {{$auth.user.email}}
                </div>
                <div class="mb-2 px-2">
                  <button
                    class="
                      bg-blue-500
                      active:bg-blue-600
                      uppercase
                      text-white
                      font-bold
                      hover:shadow-md
                      hover:bg-blue-700
                      shadow
                      text-xs
                      px-4
                      py-2
                      rounded
                      outline-none
                      focus:outline-none
                      sm:mr-2
                      mb-1
                    "
                    type="button"
                    style="transition: all 0.15s ease 0s"
                    @click="showPopUp = true"
                  >
                    Edit Profile
                  </button>
                  <!-- Popup -->
                  <Popup v-if="showPopUp" @close="showPopUp = false">
                    <div>
                    <h2 class="font-bold uppercase pb-4">Edit Profile</h2>
                    </div>
                  </Popup>
                </div>
              </div>

              <div class="mt-10 py-10 border-t border-gray-300 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-gray-800">
                      Favorite List
                    </p>

                    <!-- Card#2 Start -->
                    <div
                      v-for="fav in favlist"
                      :key="fav.id"
                      class="
                        flex
                        border-b
                        py-3
                        cursor-pointer
                        hover:shadow-md
                        px-2
                      "
                    >
                      <img
                        class="w-10 h-10 object-cover rounded-lg"
                        alt="Movie"
                        src="@/assets/film.jpg"
                      />
                      <div class="flex flex-col px-2 w-full">
                        <span
                          class="
                            text-sm text-yellow-500
                            capitalize
                            font-semibold
                            pt-1
                          "
                        >
                          {{ fav.title }}

                        </span>
                        <span
                          class="text-xs text-gray-500 uppercase font-medium"
                        >
                        <img class="w-full" :src="'https://image.tmdb.org/t/p/w400/'+fav.poster">

                  
                        </span>
                      </div>
                      <div>
                        <button
                          class="
                            py-2
                            px-4
                            mt-8
                            bg-red-600
                            text-white
                            rounded-md
                            shadow-xl
                            align-items-right
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <!-- Card End -->

                    <a href="" class="font-normal text-blue-500">Show more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div></div>
</template>

<script>
import Popup from '../../components/Popup.vue'
import navBar from '@/components/navBar.vue'

export default {
  components: { Popup,
  navBar },

  data() {
    return {
      showPopUp: false,
      favlist: [],
      Popup,
    }
  },

  // movieById = https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  // TopRated = 'https://api.themoviedb.org/3/movie/top_rated?api_key=1bbc32a207a5fbf11019fb694e45687d&language=en-US&page=1'

  //  Latest = 'https://api.themoviedb.org/3/movie/latest?language=en-US&api_key=1bbc32a207a5fbf11019fb694e45687d';

  async created() {
      const response = await fetch('https://sleepy-crag-46993.herokuapp.com/api/users/' + this.$auth.user._id)
    const data = await response.json()
    this.favlist = data.favlist
    console.log(this.favlist[0])
  },
}
</script>
<style scoped>
.bg-profile-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(/material-tailwind-kit-react/static/media/background-1920x1080.474861b8.jpg);
}
</style>
