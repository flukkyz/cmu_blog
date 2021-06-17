<template>
  <v-card
    class="mx-auto"
  >
    <v-img
      :src="post.Img ? post.Img.url : `https://picsum.photos/300?random=${post.id}`"
      max-height="200px"
    />

    <v-card-title class="text-truncate" :title="post.title">
      {{ post.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ post.type }}
    </v-card-subtitle>
    <v-card-text>
      <p class="float-right">
        <v-icon x-small class="mr-1">
          fas fa-pen-alt
        </v-icon>
        {{ post.User.account_name }}
      </p>
      <p v-if="post.Comments.length > 0" class="mb-0">
        <v-icon x-small class="mr-1">
          fas fa-comment-dots
        </v-icon>
        {{ post.Comments.length }}
        {{ post.Comments.length > 1 ? 'Comments' : 'Comment' }}
      </p>
      <p v-else class="mb-0">
        <v-icon x-small class="mr-1">
          far fa-comment
        </v-icon>
        No comment
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        :to="{ name: 'posts-id', params: { id: post.id }}"
      >
        Read More & Comment
      </v-btn>
      <v-spacer />
      <div v-if="!hideManage && ($auth.loggedIn && ($auth.user.id === post.User.id || $auth.user.role === 'admin'))">
        <v-icon
          color="warning"
          class="mr-3"
          small
          @click="$emit('edit')"
        >
          fas fa-edit
        </v-icon>
        <v-icon
          color="error"
          class="mr-3"
          small
          @click="$emit('delete')"
        >
          fas fa-trash
        </v-icon>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null
    },
    hideManage: {
      type: Boolean,
      default: false
    }
  }
}
</script>
