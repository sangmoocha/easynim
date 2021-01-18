<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background-color: #a2a2a1;
}
.v-main {
  background-color: #606060;
  color: #195190;
}
</style>
