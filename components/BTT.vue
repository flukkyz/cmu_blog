<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="show"
        color="third"
        fab
        class="btn-btt"
        @click="toTop"
      >
        <v-icon>fas fa-angle-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    toTop () {
      this.$vuetify.goTo(0)
    },
    scrollListener (e) {
      this.show = window.scrollY > 150
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-btt {
    opacity: 0.2;
    position: fixed;
    bottom: 30px;
    right: 40px;
  }
  .btn-btt:hover{
    opacity: 1;
  }
</style>
