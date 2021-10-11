<template>
  <div>
    <navBar v-on:search-movie="searchMovie" />

    <div
      class="min-h-screen bg-yellow-400 flex justify-center items-center py-20"
    >
      <div class="container mx-auto p-12 bg-gray-100 rounded-xl">
        <h1 class="text-4xl uppercase font-bold from-current mb-8 ml-96">
          {{ movie.original_title }}
        </h1>
        <div
          class="
            sm:grid sm:grid-cols-1
            lg:grid-cols-1
            gap-4
            space-y-4
            sm:space-y-0
          "
        >
          <div class="bg-white">
            <div>
              <div
                class="
                  shadow-lg
                  hover:shadow-xl
                  transform
                  transition
                  duration-500
                "
              >
                <div>
                  <img class="w-10-12 ml-96" :src="img + movie.poster_path" />
                  <div class="px-4 py-2">
                    <h1 class="text-xl font-gray-700 font-bold"></h1>
                    <div class="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 class="text-lg text-gray-600 font-semibold mb-2">
                        {{ movie.tagline }}
                      </h3>
                    </div>
                    <p class="text-sm tracking-normal">{{ movie.overview }}</p>
                    <p class="text-sm tracking-normal">{{ movie.name }}</p>

                    <p class="text-sm tracking-normal">
                      Released the {{ movie.release_date }}
                    </p>
                    <p class="text-sm tracking-normal">
                      Note : {{ movie.vote_average }} / 10
                    </p>
                    <p class="text-sm tracking-normal">
                      {{ movie.vote_count }} votes
                    </p>
                    <div v-if="key != null">
                      <iframe
                        width="420"
                        height="315"
                        class="w-10-12 ml-96"
                        :src="youtube + key"
                      >
                      </iframe>
                    </div>
                    <v-form class="ad" v-if="$auth.loggedIn">
                      <v-text-field
                        type="text"
                        placeholder="Write a comment"
                        v-model="comment.content"
                      />
                      <v-button
                        type="submit"
                        class="
                          mt-12
                          w-full
                          text-center
                          bg-yellow-400
                          py-2
                          rounded-lg
                        "
                        @click.prevent="addComment(comment)"
                      >
                        Add a comment
                      </v-button></v-form
                    >
                    <v-form
                      class="ad"
                      @submit.prevent="rateMovie(rate)"
                      v-if="$auth.loggedIn"
                    >
                      <v-text-field
                        type="number"
                        placeholder="Rate this film from 0 to 10"
                        v-model="rate.value"
                    /></v-form>
                    <button
                      v-if="$auth.loggedIn"
                      class="mt-12 w-40 text-center bg-red-400 py-2 rounded-lg"
                      @click="fav_smth(movie.id)"
                    >
                      Add to favs
                    </button>
                    <div v-for="com in comments" :key="com.id">
                      <div
                        class="bg-white p-6 rounded-lg shadow-lg mt-10 w-96"
                        v-if="com.movieId == movie.id"
                      >
                        <h4 class="text-1xl font-bold mb-2 mt-10text-gray-800">
                          {{ com.content }}
                        </h4>
                        <p class="text-gray-700 text-right">
                          From : {{ com.username }}
                        </p> <button v-if="$auth.user.username === com.username" @click.prevent="delCom(com._id)">x</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import navBar from '@/components/navBar.vue'

export default {
  components: {
    navBar,
  },
  data() {
    return {
      youtube: 'https://www.youtube.com/embed/',
      img: 'https://image.tmdb.org/t/p/w400/',
      key: '',
      movie: {},
      comments: [],
      comment: {
        content: '',
        movieId: this.$route.params.id,
      },
      rate: {
        value: '',
      },
    }
  },

  async created() {
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=ea747e23118ffc6086a4c9dd049ff674&language=en-US`
    )
    this.movie = data.data

    const res = await axios.get(`https://sleepy-crag-46993.herokuapp.com/api/comments`)
    this.comments = res.data

    const video = await axios.get(
      ` https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=ea747e23118ffc6086a4c9dd049ff674&language=en-US`
    )
    this.key = video.data.results[0].key
  },
  methods: {
    async addComment(comment) {
      const axiosConfig = {
        headers: {
          Authorization: localStorage.getItem('auth._token.local'),
        },
      }
      await axios.post(
        'https://sleepy-crag-46993.herokuapp.com/api/comments/new',
        comment,
        axiosConfig
      )
      
    const res = await axios.get(`https://sleepy-crag-46993.herokuapp.com/api/comments`)
    this.comments = res.data
    },

    async rateMovie(rate) {
      const res = await axios.get(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=ea747e23118ffc6086a4c9dd049ff674'
      )
      const session = res.data.guest_session_id
      await axios.post(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}/rating?api_key=ea747e23118ffc6086a4c9dd049ff674&guest_session_id=${session}`,
        rate
      )
    },

    async delCom(id){
      await axios.delete("https://sleepy-crag-46993.herokuapp.com//api/comments/"+ id)
       const res = await axios.get(`https://sleepy-crag-46993.herokuapp.com/api/comments`)
    this.comments = res.data

    }
  },
}
</script>

<style>
.ad {
  width: 300px;
  margin-left: 40%;
}
.ad button {
  margin-left: 62%;
}
</style>
