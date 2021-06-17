export const state = () => ({
  overlay: false,
  url: ''
})
export const mutations = {
  showImage (state, payload) {
    state.overlay = true
    state.url = payload.url
  },
  showLoading (state) {
    state.overlay = true
  },
  hide (state) {
    state.overlay = false
  }
}
