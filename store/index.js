export const state = () => ({
  drawer: false,
  dark_mode: false,
  pending_login: false,
  enums: {
    postTypes: {
      general: 'General',
      sport: 'Sport',
      technology: 'Technology',
      entertainment: 'Entertainment',
      lifestyle: 'Lifestyle',
      other: 'Other'
    }
  }
})

export const mutations = {
  setDrawer (state, val) {
    state.drawer = val
  },
  setDarkMode (state, val) {
    state.dark_mode = val
  },
  setPendingLogin (state, val) {
    state.pending_login = val
  }
}
