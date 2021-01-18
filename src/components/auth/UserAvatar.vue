<template>
  <div>
    <!--  -->
    <v-tooltip bottom v-if="$store.state.auth.user">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          dark
          @click="$router.push('/myhome')"
        >
          <v-avatar size="150">
            <img
              v-if="$store.state.auth.user.photoURL"
              :src="$store.state.auth.user.photoURL"
            />
            <img v-else src="../../assets/guest.png" />
          </v-avatar>
        </v-btn>
      </template>
      <span>Go to my page</span>
    </v-tooltip>
    <v-tooltip bottom v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" dark @click="sign">
          <v-avatar size="150">
            <v-icon color="#A2A2A1" v-bind="attrs" v-on="on">
              mdi-account-key
              <!-- mdi-login -->
            </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <span>Sign In & Sign Up</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    sign() {
      this.$router.push('/sign');
    },
    async logOut() {
      await this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUser', null);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn--fab.v-size--default,
.v-btn--icon.v-size--default {
  height: 160px;
  width: 160px;
}
.v-btn--icon.v-size--default .v-icon {
  height: 140px;
  font-size: 100px;
  width: 140px;
}
.theme--light.v-btn.v-btn--has-bg {
  background-color: #a2a2a1;
}
</style>
