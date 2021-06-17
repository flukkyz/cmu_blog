
export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ title = '', content = '', color = '', icon = '' }) {
      store.commit('snackbar/showMessage', { title, content, color, icon })
    }
  })
}
