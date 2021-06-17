<template>
  <div>
    <v-container v-if="posts">
      <div v-if="posts.totalItems > 0">
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
            lg="6"
            xl="4"
          >
            <v-text-field
              v-model="queryParams.q"
              class="mb-5"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="searchPosts"
            />
          </v-col>
        </v-row>
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
              @edit="editItem(post)"
              @delete="deleteItem(post)"
            />
          </v-col>
        </v-row>
        <div class="my-16">
          <div class="float-right">
            <v-pagination
              v-if="posts.totalPages > 1"
              v-model="queryParams.page"
              :length="posts.totalPages"
              :total-visible="5"
              @input="pageClick"
            />
          </div>
          <p v-if="posts.totalItems > 0" class="mb-0">
            Total
            {{ posts.totalItems }}
            {{ posts.totalItems > 1 ? 'items' : 'item' }}
          </p>
        </div>
      </div>
      <div v-else class="mt-16 text-center">
        <h1 class="display-3 teal--text">
          No Content
        </h1>
      </div>
    </v-container>
    <v-fab-transition v-if="$auth.loggedIn">
      <v-btn
        color="primary"
        fab
        dark
        class="btn-create"
        @click="addItem"
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <forms-post @add="submitAdd" @edit="submitEdit" />
    <dialogs-delete @delete="submitDelete" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      postApi: `${process.env.apiUrl}${process.env.apiDirectory}posts`,
      posts: null,
      queryParams: {
        size: 12,
        q: '',
        page: 1
      }
    }
  },
  async fetch () {
    this.queryParams = {
      ...this.queryParams,
      ...this.$route.query
    }
    const searchParams = new URLSearchParams(this.queryParams).toString()
    try {
      const dataPosts = await this.$axios.$get(`${this.postApi}${(searchParams ? '?' + searchParams : '')}`)
      this.posts = dataPosts
      if (this.queryParams.page > this.posts.totalPages && this.posts.totalPages > 0) {
        this.queryParams.page = this.posts.totalPages
        this.$fetch()
      }
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$breadcrumbs.setItems([
      {
        text: 'Home',
        to: { name: 'index' }
      },
      {
        text: 'Posts'
      }
    ])
  },
  head () {
    return {
      title: 'Posts'
    }
  },
  methods: {
    searchPosts (q) {
      this.queryParams.page = 1
      this.$fetch()
    },
    pageClick () {
      this.$fetch()
    },
    addItem () {
      this.$bus.$emit('open-post-form')
    },
    editItem (item) {
      this.$bus.$emit('open-post-form', item)
    },
    deleteItem (item) {
      this.$bus.$emit('open-delete-dialog', item.id, item.title)
    },
    async submitAdd (data) {
      try {
        const result = await this.$axios.$post(this.postApi, data)
        this.queryParams.page = 1
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'Created Successfuly', content: 'Created Post Successfuly', color: 'success' })
        }
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    async submitEdit (data) {
      try {
        const result = await this.$axios.$put(`${this.postApi}/${data.get('id')}`, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'Updated Successfuly', content: 'Updated Post Successfuly', color: 'success' })
        }
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    async submitDelete (id) {
      try {
        const result = await this.$axios.delete(`${this.postApi}/${id}`)
        this.queryParams.page = 1
        this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'Deleted Successfuly', content: 'Deleted Post Successfuly', color: 'success' })
        }
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-create {
    position: fixed;
    bottom: 30px;
    left: 40px;
  }
</style>
