<template>
  <div>
    <v-overlay :value="overlay">
      <div v-if="mode === 'img'" class="img-box">
        <p class="mb-0 text-right">
          <v-icon
            class="px-1"
            small
            @click="$overlay.hide()"
          >
            fas fa-times
          </v-icon>
        </p>
        <img :src="url" alt="Modal Image">
      </div>
      <div v-else-if="mode === 'progress'">
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="10"
          :value="percent"
          color="white"
        >
          {{ percent }} %
        </v-progress-circular>
        <h3 class="text-center mt-4">
          Loading
        </h3>
      </div>
      <div v-else-if="mode === 'loading'">
        <v-progress-circular
          indeterminate
          color="white"
          :size="100"
          :width="10"
        />
        <h3 class="text-center mt-4">
          Loading
        </h3>
      </div>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'loading',
      url: ''
    }
  },
  computed: {
    overlay () {
      return this.$store.state.overlay.overlay
    },
    percent () {
      return this.$store.state.overlay.percent
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      this.url = ''
      if (mutation.type === 'overlay/showImage') {
        this.mode = 'img'
        this.url = state.overlay.url
      }
      if (mutation.type === 'overlay/showProgress') {
        this.mode = 'progress'
      }
      if (mutation.type === 'overlay/showLoading') {
        this.mode = 'loading'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.img-box{
  margin: auto;
  width: 95%;
  height: 950%;
  overflow: hidden;
  img{
    max-width: 100%;
    max-height:100vh;
    width: auto;
    height: auto;
  }
}
</style>
