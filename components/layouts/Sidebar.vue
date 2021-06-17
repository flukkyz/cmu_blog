<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="blue darken-4"
      :src="back ? '' : '/images/side.jpg'"
      dark
      app
      temporary
    >
      <v-list>
        <template v-for="(item, index) in sideItems">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            class=" font-weight-bold"
            v-text="item.header"
          />

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          />
          <v-list-item
            v-else
            :key="index"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="$auth.loggedIn" block @click.stop="logout">
            <v-icon small left>
              fas fa-sign-out-alt
            </v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    back: Boolean
  },
  data () {
    return {
      sideItems: []
    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  },
  created () {
    this.$bus.$on('reset-side-menu', () => {
      this.resetSideMenu()
    })
  },
  beforeDestroy () {
    this.$bus.$off('reset-side-menu')
  },
  mounted () {
    this.resetSideMenu()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.resetSideMenu()
    },
    resetSideMenu () {
      this.sideItems = [
        {
          icon: 'fas fa-home',
          title: 'HOME',
          to: { name: 'index' }
        }
      ]
      if (this.$auth.loggedIn) {
      // ROLES 'admin', 'admis', 'reg', 'fin', 'scho','user'
        const user = this.$auth.user
        if (['admin', 'admis', 'reg', 'fin', 'scho'].includes(user.role)) {
          this.sideItems.push({ divider: true })
          this.sideItems.push({ header: 'MANAGES' })
        }
        if (['admin', 'admis', 'scho'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-bookmark',
            title: 'ADMISSION_INFO',
            to: { name: 'back-admissions' }
          })
        }
        if (['admin', 'admis', 'reg', 'fin'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-money-check-alt',
            title: 'REGISTER_PAYMENTS',
            to: { name: 'back-payments' }
          })
        }
        if (['admin', 'admis', 'reg', 'fin', 'scho'].includes(user.role)) {
          this.sideItems.push({ divider: true })
          this.sideItems.push({ header: 'SETTINGS' })
        }
        if (['admin', 'admis'].includes(user.role)) {
          this.sideItems.push({
            icon: 'mdi-clipboard-edit',
            title: 'OPENS',
            to: { name: 'back-settings-opens' }
          })
        }
        if (['admin', 'reg', 'fin'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-graduation-cap',
            title: 'PROGRAMS',
            to: { name: 'back-settings-programs' }
          })
        }
        if (['admin', 'scho', 'admis'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-hand-holding-usd',
            title: 'SCHOLARSHIPS',
            to: { name: 'back-settings-scholarships' }
          })
        }
        if (['admin'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-users',
            title: 'USERS',
            to: { name: 'back-settings-users' }
          })
        }
        if (['admin', 'admis', 'reg', 'scho'].includes(user.role)) {
          this.sideItems.push({
            icon: 'fas fa-cog',
            title: 'SYSTEM_SETTING',
            to: { name: 'back-settings-setting' }
          })
        }
      }
    }
  }
}
</script>
