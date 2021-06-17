export const state = () => ({
  breadcrumbsItems: []
})
export const mutations = {
  setItems (state, payload) {
    state.breadcrumbsItems = payload
  },
  clear (state) {
    state.breadcrumbsItems = []
  }
}
