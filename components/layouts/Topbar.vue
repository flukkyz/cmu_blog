<template>
  <div>
    <client-only>
      <v-app-bar
        app
        dark
        class="blue"
        elevate-on-scroll
        prominent
        scroll-threshold="300"
        src="https://picsum.photos/1920/1080?random"
        fade-img-on-scroll
        shrink-on-scroll
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to bottom left, rgba(0,0,0,.4), rgba(0,0,0,.7)"
          />
        </template>

        <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer" /> -->
        <v-toolbar-title>
          <div class="d-flex align-end">
            <span class="mb-0">
              CMU Share Content
            </span>
          </div>
        </v-toolbar-title>
        <v-spacer />

        <!-- <v-btn icon @click.stop="toggleDarkMode">
        <v-icon v-if="$store.state.setting && $store.state.setting.dark_mode">
          fas fa-sun
        </v-icon>
        <v-icon v-else>
          fas fa-moon
        </v-icon>
      </v-btn> -->

        <template v-if="$store.state.pending_login">
          <v-progress-circular
            class="mt-3 mr-2"
            :size="14"
            :width="3"
            indeterminate
            color="white"
          />
          <p class=" mt-2 body-1">
            Loading...
          </p>
        </template>
        <template v-else>
          <template v-if="$auth.loggedIn">
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="d-sm-flex d-md-none"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-avatar
                    size="40"
                    color="white"
                  >
                    <span class="primary--text body-2">
                      {{ $auth.user.firstname_EN.substring(0,1)+$auth.user.lastname_EN.substring(0,1) }}
                    </span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-subheader>
                  <div class="">
                    <p class="caption mb-0">
                      {{ `${$auth.user.firstname_EN} ${$auth.user.lastname_EN}` }}
                    </p>
                    <p class="mb-0 very-small">
                      {{ $auth.user.organization_name_EN }}
                    </p>
                  </div>
                </v-subheader>
                <v-divider />
                <v-list-item
                  @click="logout"
                >
                  <v-list-item-icon>
                    <v-icon>fas fa-sign-out-alt</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="'Logout'" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <div class="d-none d-md-flex py-1 px-2 mr-1 translucent rounded">
              <v-avatar
                class="mt-1"
                size="28"
                color="white"
              >
                <span class="primary--text body-2">
                  {{ $auth.user.firstname_EN.substring(0,1)+$auth.user.lastname_EN.substring(0,1) }}
                </span>
              </v-avatar>
              <div class="">
                <p class="ml-3 caption mb-0">
                  {{ `${$auth.user.firstname_EN} ${$auth.user.lastname_EN}` }}
                </p>
                <p class="ml-3 mb-0 very-small">
                  {{ $auth.user.organization_name_EN }}
                </p>
              </div>
            </div>
            <v-btn text class="py-5 d-none d-md-flex" @click.stop="logout">
              <v-icon left>
                fas fa-sign-out-alt
              </v-icon>
              Logout
            </v-btn>
          </template>
          <a v-else href="/oauth2/authorize">
            <v-btn text>
              <v-icon left>
                fas fa-sign-in-alt
              </v-icon>
              Login
            </v-btn>
          </a>
        </template>
      </v-app-bar>
    </client-only>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDrawer () {
      this.$store.commit('setDrawer', !this.$store.state.drawer)
    },
    toggleDarkMode () {
      this.$store.commit('setDarkMode', !this.$store.state.dark_mode)
      this.$vuetify.theme.dark = this.$store.state.dark_mode
    },
    async logout () {
      this.$store.commit('setPendingLogin', true)
      await this.$auth.logout()
      setTimeout(() => {
        this.$store.commit('setPendingLogin', false)
      }, 100)
      // this.$bus.$emit('reset-side-menu')
    }
  }
}
</script>
