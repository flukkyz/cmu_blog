<template>
  <v-app dark>
    <div class="box-full d-flex align-center justify-center">
      <div class="pa-2">
        <v-img src="/images/logo.png" max-width="200" contain class="mx-auto" />
        <h1 class="text-center mt-8 display-4 primary--text">
          {{ error.statusCode }}
        </h1>
        <h1 class="text-center mt-5 primary--text" :class="['sm','xs'].includes($vuetify.breakpoint.name) ? 'display-1' : 'display-2'">
          {{ title }}
        </h1>
        <div class="d-flex justify-center align-center">
          <p class="title text-center mr-2 mt-4">
            Go to
          </p>
          <v-btn class="px-2" large text :to="{name: 'index'}">
            <span class="title">
              Home page
            </span>
          </v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: ''
    }
  },
  head () {
    return {
      title: `${this.error.statusCode} - ${this.setStatusTitle(this.error.statusCode)}`
    }
  },
  created () {
    this.title = this.setStatusTitle(this.error.statusCode)
    if (this.error.statusCode === 401) {
      setTimeout(async () => {
        await this.$auth.logout()
        this.$router.push({ name: 'login' })
      }, 5000)
    }
  },
  methods: {
    setStatusTitle (status) {
      let title
      switch (status) {
        case 400:
          title = 'Bad Request'
          break
        case 401:
          title = 'Unauthorized'
          break
        case 403:
          title = 'Forbidden'
          break
        case 404:
          title = 'Not Found'
          break
        case 405:
          title = 'Method Not Allowed'
          break
        case 408:
          title = 'Request Timeout'
          break
        case 413:
          title = 'Request Entity Too Large'
          break
        case 500:
          title = 'Internal Server Error'
          break
        case 502:
          title = 'Bad Gateway'
          break
        default:
          title = 'An error occurred'
      }
      return title
    }
  }
}
</script>

<style scoped>
.error-detail {
  font-size: 20px;
}
.box-full{
  width: 100%;
  height: 100vh;
}
</style>
