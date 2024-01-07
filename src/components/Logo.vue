<template>
    <v-row class="text-center mt-2">
      <v-col v-if="$vuetify.display.mobile" class="d-flex justify-center">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-auto"
          contain
          max-width="100"
        />
      </v-col>
      <v-col cols="12 d-flex justify-center">
        <v-img v-if="!$vuetify.display.mobile"
          :src="require('../assets/logo.png')"
          class="my-auto mr-5"
          contain
          max-width="150"
        />
        <span class="text-left font-mono font-extrabold text-8xl my-auto">
          <span>Chat</span>
          <span class="cyan">M</span><span class="orange">Q</span>
        </span>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: "LogoView",
}
</script>