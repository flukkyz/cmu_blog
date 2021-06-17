<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="800">
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
          <v-text-field
            v-model="form.title"
            label="Title"
            outlined
            autofocus
            :rules="rules.titleRules"
            hint="Input your Title"
            required
          />
          <v-textarea
            v-model="form.content"
            rows="6"
            label="Content"
            outlined
            hint="Input your Content"
            required
          />
          <label for="form.type" v-text="'Type'" />
          <v-radio-group
            v-model="form.type"
            row
          >
            <v-radio
              v-for="(value, name) in $store.state.enums.postTypes"
              :key="name"
              :label="value"
              :value="name"
            />
          </v-radio-group>
          <div v-if="form.Img" class="text-center">
            <v-img :src="form.Img.url" contain max-height="300" />
            <v-btn elevation="3" small color="error" class="mt-2" @click="form.Img = null">
              Change Image
            </v-btn>
          </div>
          <div v-else>
            <v-file-input
              v-model="form.post_img"
              label="Header Image"
              accept="image/jpeg,image/gif,image/png"
              prepend-icon="mdi-image"
              outlined
              :rules="rules.imgRules"
              :show-size="1000"
              @change="changeImg"
            >
              <template v-slot:selection="{ text }">
                <v-img
                  v-if="imgPreview"
                  class="mx-auto"
                  contain
                  :aspect-ratio="1/1.4142"
                  max-width="300"
                  max-height="300"
                  :src="imgPreview"
                />
                <span class="ml-3">
                  {{ text }}
                </span>
              </template>
            </v-file-input>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" x-large block type="submit" :disabled="oneClick">
            {{ saveText }}
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
      imgPreview: null,
      valid: true,
      oneClick: false,
      rules: {
        titleRules: [
          v => !!v || 'Title is required'
        ],
        imgRules: [
          (v) => {
            const mimetypeImages = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
            return !v || mimetypeImages.includes(v.type) || 'Files must be Images or PDF only'
          },
          v => !v || v.size < 2000000 || 'Image size must be less than 2MB'
        ]
      },
      form: {}
    }
  },
  computed: {
    headerText () {
      return this.mode === 'add' ? 'New Post' : 'Edit Post'
    },
    headerIcon () {
      return this.mode === 'add' ? 'fas fa-plus' : 'fas fa-edit'
    },
    saveText () {
      return this.mode === 'add' ? 'Post' : 'Edit Post'
    }
  },
  created () {
    this.$bus.$on('open-post-form', (data) => {
      this.$overlay.showLoading()
      this.oneClick = false
      this.clearData()
      this.mode = 'add'
      if (data) {
        this.mode = 'edit'
        this.form = { ...data }
        delete this.form.img_id
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
    this.$bus.$off('open-post-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    changeImg (val) {
      if (val) {
        this.imgPreview = URL.createObjectURL(this.form.post_img)
      }
    },
    clearData () {
      this.imgPreview = null
      this.form = {
        title: '',
        content: '',
        type: 'general',
        post_img: null
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.oneClick = true
        const formData = new FormData()
        for (const [key, value] of Object.entries(this.form)) {
          formData.append(key, value)
        }
        this.$emit(this.mode, formData)
        this.dialog = false
      }
    }
  }
}
</script>
