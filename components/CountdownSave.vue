<template>
  <div v-if="timer > 0" class="countdown-save d-flex flex-column pt-4 pb-3 px-4 rounded-xl">
    <p class="mb-1 very-small primary--text text-center font-weight-bold" v-text="title" />
    <div class="d-flex mx-auto">
      <v-progress-circular
        :rotate="-90"
        :size="32"
        :width="4"
        :value="countdownPercent"
        color="primary"
      >
        <span class="very-small font-weight-bold">
          {{ timerText }}
        </span>
      </v-progress-circular>
      <p class="ml-1 mt-2 very-small primary--text font-weight-bold" v-text="unit" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countdownTime: {
      type: Number,
      default: 3
    },
    title: {
      type: String,
      default: 'Auto Save in'
    },
    unit: {
      type: String,
      default: 'sec'
    },
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      timeInterval: null,
      saveDelayTime: 3000,
      timer: 0
    }
  },
  computed: {
    countdownPercent () {
      return Math.floor(((this.countdownTime * 1000) - this.timer) / 3000 * 100)
    },
    timerText () {
      return this.timer / 1000
    }
  },
  mounted () {
    this.$bus.$on(`countdown-save${(this.value ? `-${this.value}` : '')}`, () => {
      clearInterval(this.timeInterval)
      this.timer = this.countdownTime * 1000
      this.timeInterval = setInterval(() => {
        this.timer -= 100
        if (this.timer <= 0) {
          clearInterval(this.timeInterval)
          this.$emit('save')
        }
      }, 100)
    })
  },
  beforeDestroy () {
    this.$bus.$off(`countdown-save${(this.value ? `-${this.value}` : '')}`)
  }
}
</script>

<style lang="scss" scoped>
  .countdown-save {
    background-color: #00000011;
    position: fixed;
    bottom: 30px;
    left: 40px;
  }
</style>
