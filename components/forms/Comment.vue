<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="600">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card>
        <v-toolbar
          color="info"
          dark
          flat
        >
          <v-toolbar-title>
            <v-icon class="mr-2">
              {{ headerIcon }}
            </v-icon>
            {{ headerText }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-textarea
            v-model="form.comment"
            rows="3"
            autofocus
            label="Comment"
            outlined
            hint="Input your Comment"
            :rules="rules.commentRules"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" x-large block type="submit" :disabled="oneClick">
            Comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      mode: '',
      valid: true,
      oneClick: false,
      rules: {
        commentRules: [
          v => !!v || 'Comment is required'
        ]
      },
      form: {}
    }
  },
  computed: {
    headerText () {
      return this.mode === 'add' ? 'New Comment' : 'Edit Comment'
    },
    headerIcon () {
      return this.mode === 'add' ? 'fas fa-plus' : 'fas fa-edit'
    }
  },
  created () {
    this.$bus.$on('open-comment-form', (post, data) => {
      this.$overlay.showLoading()
      this.oneClick = false
      this.clearData()
      this.mode = 'add'
      if (data) {
        this.mode = 'edit'
        this.form = { ...data }
      } else {
        this.form.post_id = post.id
      }
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
        this.dialog = true
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-comment-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        comment: '',
        post_id: null
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.oneClick = true
        this.$emit(this.mode, this.form)
        this.dialog = false
      }
    }
  }
}
</script>
