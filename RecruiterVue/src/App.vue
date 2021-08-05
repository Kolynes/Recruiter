<template>
  <v-app>
    <v-scroll-x-transition leave-absolute>
      <router-view/>
    </v-scroll-x-transition>
    <v-toast/>
    <v-confirmation/>
  </v-app>
</template>

<script>
  import VToast from "./vuetify-extensions/VToast.vue"
  import VConfirmation from "./vuetify-extensions/VConfirmation.vue"

  export default {
    components: {
      VToast,
      VConfirmation
    }
  }
</script>
