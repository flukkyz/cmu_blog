export const state = () => ({
  title: '',
  content: '',
  color: '',
  icon: ''
})
export const mutations = {
  showMessage (state, payload) {
    state.title = payload.title
    state.content = payload.content
    state.color = payload.color
    state.icon = payload.icon
  }
}
