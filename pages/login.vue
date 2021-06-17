<template>
  <v-container>
    <a href="/oauth2/authorize">
      <h1 class="display-4 mt-16 teal--text text-center">
        <span class="fas fa-sign-in-alt" />
      </h1>
      <p class="title teal--text text-center">
        Login
      </p>
    </a>
  </v-container>
</template>

<script>
export default {
  middleware: 'guest',
  fetch () {
    this.$breadcrumbs.clear()
  }
}
</script>
