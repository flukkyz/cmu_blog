<template>
  <div>
    <client-only>
      <v-breadcrumbs v-if="breadcrumbsItems.length > 0" :items="breadcrumbsItems">
        <template #divider>
          <v-icon>
            mdi-forward
          </v-icon>
        </template>
        <template #item="{ item }">
          <v-breadcrumbs-item :disabled="!item.to">
            <nuxt-link v-if="item.to" class="third--text" :to="item.to" v-text="item.text" />
            <span v-else v-text="item.text" />
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbsItems () {
      return this.$store.state.breadcrumbs && this.$store.state.breadcrumbs.breadcrumbsItems ? this.$store.state.breadcrumbs.breadcrumbsItems : []
    }
  }
}
</script>
