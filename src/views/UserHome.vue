<template>
  <div>
    <v-app-bar app dark flat class="px-2">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            dark
            @click="$router.push('/')"
            class="ml-10"
          >
            <v-img
              alt="Logo"
              class="shrink mr-2 logo"
              contain
              src="../assets/logo.png"
            />
          </v-btn>
        </template>
        <span>Go Home</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-menu offset-y v-if="$store.state.auth.user">
        <template v-slot:activator="{ on }">
          <v-btn fab depressed v-on="on">
            <v-avatar size="42">
              <v-img
                v-if="$store.state.auth.user.photoURL"
                :src="$store.state.auth.user.photoURL"
              ></v-img>
              <v-img v-else src="../assets/guest.png"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card dark class="userInfo">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                {{ $store.state.auth.user.email }}
              </div>
              <v-list-item-title
                class="headline mb-1"
                v-text="$store.state.auth.user.displayName"
              />
              <v-list-item-subtitle>
                <span v-if="$store.state.auth.user.emailVerified">
                  기록되지 않은 것은 기억되지 않습니다.
                </span>
                <div v-else>
                  <span>메일 인증이 되어 있지 않습니다.</span>
                  <v-btn dark small class="mt-3">
                    <v-icon left>mdi-email-send</v-icon>
                    <span>인증 다시 보내기</span>
                  </v-btn>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img
                v-if="$store.state.auth.user.photoURL"
                :src="$store.state.auth.user.photoURL"
              ></v-img>
              <v-img v-else src="../assets/guest.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions class="mr-3 ml-3 pt-3">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab depressed dark small v-on="on">
                  <v-icon color="amber darken-3">
                    mdi-lock-reset
                  </v-icon>
                </v-btn>
              </template>
              <span>Reset password</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab depressed dark small v-on="on">
                  <v-icon color="amber darken-3">
                    mdi-email-edit-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Change your email address</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn fab depressed dark small v-on="on" @click="logOut">
                  <v-icon color="amber darken-3">
                    mdi-logout-variant
                  </v-icon>
                </v-btn>
              </template>
              <span>Logout</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { auth } from '../plugins/firebase';
export default {
  methods: {
    async logOut() {
      await auth.signOut().then(() => {
        this.$store.commit('setUser', null);
      });
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 70px;
  margin-left: 10px;
}
.userInfo {
  max-width: 344px;
  margin-top: 15px;
}
</style>
