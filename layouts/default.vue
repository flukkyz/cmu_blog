<template>
  <v-app dark>
    <client-only>
      <layouts-topbar />
    </client-only>
    <v-main>
      <v-container>
        <client-only>
          <breadcrumbs />
        </client-only>
        <nuxt />
      </v-container>
    </v-main>
    <client-only>
      <snackbar />
      <overlay />
      <b-t-t />
    </client-only>
  </v-app>
</template>

<script>
export default {
  name: 'Default'
}
</script>

<style lang="scss">
  .text-field-right{
    .v-text-field__slot{
    input{
      text-align: right !important;
    }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .on-center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .w-100{
    width: 100%;
  }
  .w-75{
    width: 75%;
  }
  .w-50{
    width: 50%;
  }
  .w-25{
    width: 25%;
  }
  .h-100{
    height: 100%;
  }
  .h-75{
    height: 75%;
  }
  .h-50{
    height: 50%;
  }
  .h-25{
    height: 25%;
  }
  a:hover,
  a:visited,
  a:link,
  a:active {
      text-decoration: none;
  }
  .top-items{
    align-items: flex-start;
  }
  .center-items{
    align-items: center;
  }
  .bottom-items{
    align-items: flex-end;
  }
  .very-small{
    font-size: 0.6rem !important;
  }
  .translucent{
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
