<template>
  <div class="pt-16">
    <v-row justify="center" class="mt-16">
      <v-col cols="8">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        />
      </v-col>
    </v-row>
    <h1 class="display-1 text-center teal--text mt-5">
      Waiting for Authentication
    </h1>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  validate ({ query }) {
    return query.code && query.state
  },
  head () {
    return {
      title: 'Authentication'
    }
  },
  created () {
    this.$breadcrumbs.clear()
    this.$store.commit('setPendingLogin', true)
  },
  async beforeMount () {
    const timeOfTimeout = 20
    const timeout = setTimeout(() => {
      this.$store.commit('setPendingLogin', false)
      this.$nuxt.error({ statusCode: 401, message: 'Unauthorized' })
    }, timeOfTimeout * 1000)
    const acc = await this.$axios.$get(`${process.env.baseUrl}/oauth2/callback?code=${this.$route.query.code}&state=${this.$route.query.state}`)
    this.$auth.setUserToken(acc.access_token, acc.refresh_token).then(async () => {
      const user = await this.$auth.fetchUser()
      if (user) {
        clearTimeout(timeout)
      }
      this.$store.commit('setPendingLogin', false)
    })
  }
}
</script>
