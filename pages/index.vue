<template>
  <div>
    <v-container v-if="posts">
      <div v-if="posts.totalItems > 0">
        <h2 class="text-center mb-5 mt-16">
          Last Content
        </h2>
        <v-row justify="center">
          <v-col
            v-for="post in posts.rows"
            :key="post.id"
            cols="12"
            md="6"
            lg="4"
            xl="3"
          >
            <cards-post
              :post="post"
              hide-manage
            />
          </v-col>
        </v-row>
        <p class="mt-3 text-right">
          <nuxt-link v-if="posts.totalItems > 3" class="text-right" :to="{ name: 'posts'}">
            View more
          </nuxt-link>
          <nuxt-link v-else class="text-right" :to="{ name: 'posts'}">
            <v-icon color="info" small class="mr-1">
              fas fa-plus
            </v-icon>
            New Post
          </nuxt-link>
        </p>
      </div>
      <div v-else class="mt-16 text-center">
        <h1 class="display-3 teal--text">
          No Content
        </h1>
        <p class="title mt-5">
          <nuxt-link :to="{name: 'posts'}">
            <v-icon color="info" small class="mr-1">
              fas fa-plus
            </v-icon>
            New Post
          </nuxt-link>
        </p>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postApi: `${process.env.apiUrl}${process.env.apiDirectory}posts`,
      posts: null,
      queryParams: {
        size: 3
      }
    }
  },
  async fetch () {
    const searchParams = new URLSearchParams(this.queryParams).toString()
    try {
      const dataPosts = await this.$axios.$get(`${this.postApi}${(searchParams ? '?' + searchParams : '')}`)
      this.posts = dataPosts
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$breadcrumbs.clear()
  },
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
