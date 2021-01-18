<template>
  <v-list-item three-line>
    <v-list-item-content>
      <v-row class="d-flex justify-center">
        <v-tooltip
          bottom
          v-for="socialBtnElement in socialBtnElements"
          :key="socialBtnElement.id"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-5"
              icon
              elevation="2"
              :color="socialBtnElement.color"
              @click="social(socialBtnElement)"
            >
              <v-icon v-bind="attrs" v-on="on">
                {{ socialBtnElement.icon }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ socialBtnElement.name }}</span>
        </v-tooltip>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { auth, db } from '../../plugins/firebase';

export default {
  data() {
    return {
      socialBtnElements: [
        { name: 'twitter', color: 'light-blue accent-2', icon: 'mdi-twitter' },
        { name: 'facebook', color: 'indigo', icon: 'mdi-facebook' },
        { name: 'google', color: 'red', icon: 'mdi-google' }
      ]
    };
  },
  methods: {
    setProvider(name) {
      switch (name) {
        case 'google':
          return new this.$firebase.auth.GoogleAuthProvider();
        case 'twitter':
          return new this.$firebase.auth.TwitterAuthProvider();
        case 'facebook':
          return new this.$firebase.auth.FacebookAuthProvider();
        default:
          throw Error('공급자를 찾을 수 없습니다.');
      }
    },
    async social(socialElement) {
      try {
        // this.dial.loading = true;
        await auth.signInWithPopup(this.setProvider(socialElement.name));
        const user = await auth.currentUser;

        if (user) {
          const ref = await db.collection('user');
          const doc = await ref.doc(user.uid).get();
          if (doc.exists) {
            await ref.doc(user.uid).update({ updateDate: new Date() });
          } else {
            await ref.doc(user.uid).set({
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              providerIcon: socialElement.icon,
              userRank: 1,
              createDate: new Date(),
              updateDate: new Date()
            });
          }
        }
        // user.getIdToken().then(token => {
        //   console.log(token);
        //   this.$store.commit('setToken', token);
        //   localStorage.setItem('setToken', token);
        // });
        // if (!user.emailVerified) {
        //   await user.sendEmailVerification();
        // }
      } catch (error) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            throw Error('작업을 완료하기 전에 사용자가 팝업을 닫았습니다.');
          case 'auth/user-cancelled':
            throw Error('사용자가 권한 부여를 거부 하였습니다.');
          case 'auth/too-many-requests':
            throw Error(
              '로그인 시도가 너무 많습니다. 나중에 다시 시도하십시오.'
            );
          case 'auth/user-disabled':
            throw Error('관리자에 의해 사용자 계정이 비활성화되었습니다.');
          case 'auth/unauthorized-domain':
            throw Error('이 도메인은 작업을 실행할 권한이 없습니다.');
          case 'auth/invalid-credential':
            throw Error('OAUTH1_REQUEST_TOKEN에 대한 응답이 잘못 되었습니다.');
          default:
            throw Error(error.massage);
          // console.log(error);
        }
        // throw Error(error.massage);
      } finally {
        // this.dial.loading = false;
        // console.log(this.user);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item {
  max-width: 400px;
}
.v-btn {
  width: 4.5rem;
  height: 4.5rem;
  .v-icon {
    font-size: 3rem;
    color: #fff;
  }
}
</style>
