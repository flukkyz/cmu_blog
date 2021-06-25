<template>
  <div>
    <v-container v-if="post && comments">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="display-1 mb-0 mt-2 text-center">
            {{ post.title }}
          </h2>
          <p class="title text-center teal--text mt-2">
            {{ $store.state.enums.postTypes[post.type] }}
          </p>
          <v-img
            v-if="post.Img"
            :src="post.Img.url"
          />
          <p class="body-1 mt-4">
            {{ post.content }}
          </p>
          <div v-if="$auth.loggedIn && ($auth.user.id === post.User.id || $auth.user.role === 'admin')" class="float-right">
            <v-icon
              color="warning"
              class="mr-3"
              small
              @click="editItemPost(post)"
            >
              fas fa-edit
            </v-icon>
            <v-icon
              color="error"
              small
              @click="deleteItemPost(post)"
            >
              fas fa-trash
            </v-icon>
          </div>
          <p class="teal--text caption">
            <v-icon x-small>
              fas fa-pen-alt
            </v-icon>
            <span class="font-weight-bold">
              {{ post.User.account_name }}
            </span>
            <v-icon x-small class="ml-2">
              fas fa-calendar-plus
            </v-icon>
            {{ $dateText(post.createdAt,'medium','short') }}
          </p>

          <v-btn
            block
            x-large
            color="info"
            @click="addItemComment"
          >
            <v-icon left>
              fas fa-comment-dots
            </v-icon>
            Comment
          </v-btn>
          <div class="my-5">
            <v-card
              v-for="(comment,index) in comments.rows"
              :id="`comment-${comment.id}`"
              :key="comment.id"
              class="mb-2"
            >
              <v-card-text>
                <div v-if="$auth.loggedIn && ($auth.user.id === comment.User.id || $auth.user.id === post.User.id || $auth.user.role === 'admin')" class="float-right">
                  <v-icon
                    color="warning"
                    class="mr-3"
                    small
                    @click="editItemComment(comment)"
                  >
                    fas fa-edit
                  </v-icon>
                  <v-icon
                    color="error"
                    small
                    @click="deleteItemComment(comment)"
                  >
                    fas fa-trash
                  </v-icon>
                </div>
                <p class="body-1">
                  #Comment
                  {{ index+1 }}
                  &nbsp;
                  <span class="caption">
                    <v-icon x-small>
                      fas fa-comment-dots
                    </v-icon>
                    <span class="font-weight-bold">
                      {{ comment.User.account_name }}
                    </span>
                    <v-icon x-small class="ml-2">
                      fas fa-calendar-plus
                    </v-icon>
                    {{ $dateText(comment.createdAt,'medium','short') }}
                  </span>
                </p>

                {{ comment.comment }}
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <forms-post @edit="submitEditPost" />
    <forms-comment @add="submitAddComment" @edit="submitEditComment" />
    <dialogs-delete @delete="submitDelete" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  validate ({ params }) {
    return params.id && /^\d+$/.test(params.id)
  },
  data () {
    return {
      postApi: `${process.env.apiUrl}${process.env.apiDirectory}posts`,
      commentApi: `${process.env.apiUrl}${process.env.apiDirectory}comments`,
      post: null,
      comments: null
    }
  },
  async fetch () {
    try {
      const dataPost = await this.$axios.$get(`${this.postApi}/${this.$route.params.id}`)
      this.post = dataPost
      const dataComments = await this.$axios.$get(`${this.commentApi}/${this.post.id}`)
      this.comments = dataComments
      this.$breadcrumbs.setItems([
        {
          text: 'Home',
          to: { name: 'index' }
        },
        {
          text: 'Posts',
          to: { name: 'posts' }
        },
        {
          text: this.post.title
        }
      ])
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  head () {
    return {
      title: this.post ? this.post.title : ''
    }
  },
  methods: {
    addItemComment () {
      this.$bus.$emit('open-comment-form', this.post)
    },
    editItemPost (item) {
      this.$bus.$emit('open-post-form', item)
    },
    editItemComment (item) {
      this.$bus.$emit('open-comment-form', this.post, item)
    },
    deleteItemPost (item) {
      this.$bus.$emit('open-delete-dialog', item.id, 'Post: ' + item.title, 'post')
    },
    deleteItemComment (item) {
      this.$bus.$emit('open-delete-dialog', item.id, 'Your Comment', 'comment')
    },
    async submitAddComment (data) {
      try {
        const result = await this.$axios.$post(this.commentApi, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'Comment Successfuly', content: 'Created Comment Successfuly', color: 'success' })
        }
        this.$vuetify.goTo(`#comment-${result.id}`)
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    async submitEditPost (data) {
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
    async submitEditComment (data) {
      try {
        const result = await this.$axios.$put(`${this.commentApi}/${data.id}`, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'Updated Successfuly', content: 'Updated Comment Successfuly', color: 'success' })
        }
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    async submitDelete (id, key) {
      if (key === 'post') {
        try {
          const result = await this.$axios.delete(`${this.postApi}/${id}`)
          if (result) {
            this.$notifier.showMessage({ title: 'Deleted Successfuly', content: 'Deleted Post Successfuly', color: 'success' })
            this.$overlay.hide()
            this.$router.push({ name: 'posts' })
          }
        } catch (e) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      } else {
        try {
          const result = await this.$axios.delete(`${this.commentApi}/${id}`)
          await this.$fetch()
          if (result) {
            this.$notifier.showMessage({ title: 'Deleted Successfuly', content: 'Deleted Comment Successfuly', color: 'success' })
          }
        } catch (e) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
        this.$overlay.hide()
      }
    }
  }
}
</script>
