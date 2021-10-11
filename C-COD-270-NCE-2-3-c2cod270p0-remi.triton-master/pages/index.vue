
<template>
  <div>
    <navBar v-on:search-movie="searchMovie" />

    <div class="flex items-center IMG">
      <div
        class="
          border border-gray-600
          bg-gray-200
          mt-10
          mb-10
          ml-96
          w-80
          shadow-2xl
          items-center
        "
      >
        <p class="text-center mt-10 items-center text-sm">
          “Life is not the amount of breaths you take. It’s the moments that
          take your breath away.”
        </p>
        <p class="text-right mt-5 items-center text-sm">–Alex Hitchens</p>
      </div>
    </div>
    <div
      class="min-h-screen bg-yellow-400 flex justify-center items-center py-20"
    >
      <div class="container mx-auto p-12 bg-gray-100 rounded-xl">
        <h1 class="text-4xl uppercase font-bold from-current mb-8">
          Movies trending
        </h1>
        <div
          class="
            sm:grid sm:grid-cols-2
            lg:grid-cols-3
            gap-4
            space-y-4
            sm:space-y-0
          "
        >
          <div
            v-for="movie in movies.slice(0, 6)"
            :key="movie.id"
            class="bg-white"
          >
            <div>
              <div
                class="
                  shadow-lg
                  hover:shadow-xl
                  transform
                  transition
                  duration-500
                  hover:scale-105
                "
              >
                <div>
                  <img class="w-full" :src="img + movie.poster_path" />
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
                        {{ movie.original_title }}
                      </h3>
                    </div>
                    <p class="text-sm tracking-normal">{{ movie.overview }}</p>
                    <p>Note : {{ movie.vote_average }} / 10</p>
                    <p>{{ movie.vote_count }} votes</p>
                    <nuxt-link :to="path + movie.id"
                      ><button
                        class="
                          mt-12
                          w-full
                          text-center
                          bg-yellow-400
                          py-2
                          rounded-lg
                        "
                      >
                        Watch and rate
                      </button></nuxt-link
                    >
                    <div v-if="$auth.loggedIn">
                      <button
                        class="
                          mt-12
                          w-full
                          text-center
                          bg-red-400
                          py-2
                          rounded-lg
                        "
                        @click="fav_smth(movie.id)"
                      >
                        Add to favs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          
          <h3>Filter By Genre</h3>
          <select
            name="category_id"
            @change="onChange($event)"
            class="form-control"
          >
            <option></option>
            <option
              v-for="genre of genres"
              v-bind:value="genre.id"
              v-bind:key="genre"
            >
              {{ genre.name }}
            </option>
          </select>
          <h3>Filter By Date</h3>
          <select
            name="category_id"
            @change="onChange2($event)"
            class="form-control"
          >
            <option></option>
            <option v-for="year in 2021" v-bind:value="year" v-bind:key="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <Pied />
  </div>
</template>

<script>
import axios from 'axios'
import navBar from '@/components/navBar.vue'
import Pied from '@/components/Pied.vue'

export default {
  name: 'app',
  components: {
    navBar,
    Pied,
  },
  data() {
    return {
      path: 'movies/',
      img: 'https://image.tmdb.org/t/p/w400/',
      movies: [],
      favs: [],
      genres: [],
      years: [],
      person: [],
    }
  },
  async created() {
    const response = await axios.get(
      ' https://api.themoviedb.org/3/trending/movie/week?api_key=ea747e23118ffc6086a4c9dd049ff674'
    )
    this.movies = response.data.results
  },
  methods: {
    async searchMovie(query) {
      this.movies = []
      const api = `https://api.themoviedb.org/3/search/movie?api_key=97924c69f25de6e227bcd444a2ca2f3b&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`
      const { data } = await axios.get(api)
      this.movies = data.results
    },
    // get movies filtered by genre
    onChange(event) {
      axios
        .get(
          'https://api.themoviedb.org/3/movie/popular/?api_key=ea747e23118ffc6086a4c9dd049ff674&with_genres=' +
            event.target.value
        )
        .then((response) => (this.movies = response.data.results))
    },
    // get movies filtered by year
    onChange2(event) {
      axios
        .get(
          'http://api.themoviedb.org/3/discover/movie?api_key=ea747e23118ffc6086a4c9dd049ff674&primary_release_year=' +
            event.target.value
        )
        .then((response) => (this.movies = response.data.results))
    },

    async fav_smth(id) {
      const res = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '?api_key=ea747e23118ffc6086a4c9dd049ff674'
      )
      console.log(res)
      this.favs = res.data
      // const favjson = JSON.stringify(this.favs);
      console.log(this.favs.original_title)

      await axios.put(
        'http://localhost:3000/api/users/update/' + this.$auth.user._id + '/',
        {
          favlist: [
            {
              title: this.favs.original_title,
              poster: this.favs.poster_path,
              id: this.favs.id,
            },
          ],
        }
      )
      console.log(this.$auth.user._id)
    },
  },

  mounted() {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=ea747e23118ffc6086a4c9dd049ff674'
      )
      .then((response) => (this.movies = response.data.results))
    axios
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=ea747e23118ffc6086a4c9dd049ff674'
      )
      .then((response) => (this.genres = response.data.genres))
    axios
      .get(
        'http://api.themoviedb.org/3/discover/movie?api_key=ea747e23118ffc6086a4c9dd049ff674&primary_release_year=' +
          this.year
      )
      .then((response) => (this.years = response.data.years))
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@100;300&display=swap');

.IMG {
  background-image: url('~assets/mia.jpg');
  border: 1px solid white;
}

body {
  background-color: #d1d5db;
}
h1 {
  text-align: center;
}

p {
  margin: 10px;
  font-family: 'Urbanist', Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>


