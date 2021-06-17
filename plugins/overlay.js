
export default ({ app, store }, inject) => {
  inject('overlay', {
    showImage ({ url = '' }) {
      store.commit('overlay/showImage', { url })
    },
    showLoading () {
      store.commit('overlay/showLoading')
    },
    showProgress () {
      store.commit('overlay/showProgress')
    },
    updateProgress (percent = 0) {
      store.commit('overlay/updateProgress', percent)
    },
    hide () {
      store.commit('overlay/hide')
    }
  })
}
