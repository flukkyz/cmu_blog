<template>
  <div>
    <input :id="inputId + '-copy'" type="hidden" :value="copyText">
    <v-btn
      x-small
      rounded
      :disabled="disableCopyBtn"
      @click="copyToClipboard"
    >
      {{ btnText }}
      {{ btnAppendText }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    inputId: {
      type: String,
      default: 'input'
    },
    btnAppendText: {
      type: String,
      default: ''
    },
    copyText: {
      type: String,
      default: ''
    },
    disableDuration: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      btnText: 'Copy',
      disableCopyBtn: false
    }
  },
  methods: {
    copyToClipboard () {
      this.disableCopyBtn = true
      const copy = document.querySelector('#' + this.inputId + '-copy')
      copy.value = this.copyText
      copy.setAttribute('type', 'text')
      copy.select()

      try {
        document.execCommand('copy')
        this.$notifier.showMessage({ title: 'Copy to Clipboard', content: 'Copied ' + this.copyText, color: 'info' })
        this.btnText = 'Copied'
        setTimeout(() => {
          this.btnText = 'Copy'
          this.disableCopyBtn = false
        }, this.disableDuration)
      } catch (err) {
        this.disableCopyBtn = false
      }

      copy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>
