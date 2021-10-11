<template>
  <div>
    <div class='w-full text-gray-100 bg-gray-600 dark-mode:text-gray-200 dark-mode:bg-gray-800'>
      <div x-data='{ open: false }'
           class='flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
        <div class='p-4 flex flex-row items-center justify-between'>
          <nuxt-link to='/'
                     class='text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline'>
            Our Rottem Tomatoes
          </nuxt-link>
        </div>
        <nav
          class="
            flex-col flex-grow
            pb-4
            md:pb-0
            hidden
            md:flex
            md:justify-end
            md:flex-row
          "
        >
          <nuxt-link
            to="/"
            class="
              px-4
              py-2
              mt-0
              text-sm
              font-semibold
              mr-3
              text-gray-900
              bg-gray-200
              rounded-lg
              dark-mode:bg-gray-700
              dark-mode:hover:bg-gray-600
              dark-mode:focus:bg-gray-600
              dark-mode:focus:text-white
              dark-mode:hover:text-white
              dark-mode:text-gray-200
              md:mt-0
              hover:text-gray-900
              focus:text-gray-900
              hover:bg-gray-200
              focus:bg-gray-200
              focus:outline-none
              focus:shadow-outline
            "
            >Home</nuxt-link
          >

          <div v-if="$auth.loggedIn">
          <nuxt-link to='auth/profile'>  Welcome {{ $auth.user.username }}</nuxt-link>
            <button
              class="
                px-4
                py-2
                mt-2
                ml-10
                text-sm
                font-semibold
                bg-transparent
                rounded-lg
                dark-mode:bg-transparent
                dark-mode:hover:bg-gray-600
                dark-mode:focus:bg-gray-600
                dark-mode:focus:text-white
                dark-mode:hover:text-white
                dark-mode:text-gray-200
                md:mt-0
                md:ml-4
                hover:text-gray-900
                focus:text-gray-900
                hover:bg-gray-200
                focus:bg-gray-200
                focus:outline-none
                focus:shadow-outline
              "
              @click="$auth.logout()"
            >
              LOGOUT
            </button>
          </div>
          <div class='mt-1' v-else>
            <nuxt-link
              to="/auth/login"
              class="
                px-4
                py-2
                mt-8
                text-sm
                font-semibold
                bg-transparent
                rounded-lg
                dark-mode:bg-transparent
                dark-mode:hover:bg-gray-600
                dark-mode:focus:bg-gray-600
                dark-mode:focus:text-white
                dark-mode:hover:text-white
                dark-mode:text-gray-200
                md:mt-0
                md:ml-4
                hover:text-gray-900
                focus:text-gray-900
                hover:bg-gray-200
                focus:bg-gray-200
                focus:outline-none
                focus:shadow-outline
              "
              >Login</nuxt-link
            >
            <nuxt-link
              to="/auth/register"
              class="
                px-4
                py-2
                mt-2
                text-sm
                font-semibold
                bg-transparent
                rounded-lg
                dark-mode:bg-transparent
                dark-mode:hover:bg-gray-600
                dark-mode:focus:bg-gray-600
                dark-mode:focus:text-white
                dark-mode:hover:text-white
                dark-mode:text-gray-200
                md:mt-0
                md:ml-4
                hover:text-gray-900
                focus:text-gray-900
                hover:bg-gray-200
                focus:bg-gray-200
                focus:outline-none
                focus:shadow-outline
              "
              >Register</nuxt-link
            >
          </div>
          <form @submit.prevent='search'>
          <input
            class="
              border-2 border-gray-300
              bg-white
              h-10
              px-5
              pr-16
              rounded-lg
              ml-5
              text-sm
              focus:outline-none
              text-black
            "
            type="search"
            name="search"
            placeholder="Search"
            v-model='query'
          />
          <button type="submit" class="absolute top-0 mt-5 mr-4">
            <svg
              class="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
              style="enable-background: new 0 0 56.966 56.966"
              xml:space="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
          </form>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    search() {
      this.$emit('search-movie', this.query)
      this.query = ''
    },
  },
}
</script>
