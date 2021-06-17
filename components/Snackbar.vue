<template>
  <v-snackbar v-model="show" :color="color">
    <div class="d-flex">
      <v-avatar
        slot="icon"
        color="transparent"
        size="40"
        class="mr-2"
      >
        <v-icon>
          {{ icon }}
        </v-icon>
      </v-avatar>

      <div>
        <h2 v-if="title" class="mb-1 font-weight-light">
          {{ title }}
        </h2>
        <p v-if="content" class="mb-0">
          {{ content }}
        </p>
      </div>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="show = false"
      >
        ปิด
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      icons: {
        success: 'fas fa-check',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle'
      },
      show: false,
      title: '',
      content: '',
      color: '',
      icon: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.title = state.snackbar.title
        this.content = state.snackbar.content
        this.color = state.snackbar.color
        this.icon = state.snackbar.icon ? state.snackbar.icon : this.icons[state.snackbar.color]
        this.show = true
      }
    })
  }
}
</script>
