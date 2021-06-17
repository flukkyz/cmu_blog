
export default ({ app, store }, inject) => {
  inject('breadcrumbs', {
    setItems (items = []) {
      store.commit('breadcrumbs/setItems', items)
    },
    clear () {
      store.commit('breadcrumbs/clear')
    }
  })
}
