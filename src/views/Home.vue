<template>
  <v-card
    class="d-flex justify-center align-center fill-height"
    color="#A2A2A1"
  >
    <hello-world />
  </v-card>
</template>

<script>
// import UserAvatar from '../components/auth/UserAvatar.vue';
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // UserAvatar,
    HelloWorld
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    sign() {
      this.$router.push('/sign');
    }
  }
};
</script>

<style lang="scss"></style>
