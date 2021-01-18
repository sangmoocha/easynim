<template>
  <v-form ref="form" lazy-validation class="sign-up-form">
    <div class="signForm">
      <v-card-title>
        <h1>Sign Up</h1>
      </v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <v-col>
            <v-text-field
              v-model="nickName"
              :rules="[rules.required, rules.special]"
              rounded
              solo
              label="Name"
              append-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              rounded
              solo
              label="E-Mail"
              append-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min(6)]"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              solo
              rounded
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="repassword"
              :rules="[rules.required, rules.repassword]"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              solo
              rounded
              label="Confirm Password"
            ></v-text-field>
            <v-btn
              large
              block
              rounded
              color="#0063b2"
              class="btn-confim"
              @click="register"
            >
              Register
            </v-btn>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-form>
</template>

<script>
import { auth, db } from '../../plugins/firebase';
export default {
  data() {
    return {
      show: false,
      nickName: '',
      email: '',
      password: '',
      repassword: '',
      rules: {
        required: value => !!value.trim() || 'Required.',
        min: len => value =>
          (value ? value.length : 0) >= len || `Min ${len}  characters.`,
        special: value => {
          const pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
          return !pattern.test(value) || 'Special characters cannot be used.';
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        repassword: value =>
          value.trim() === this.password.trim() || 'Passwords do not match.'
      }
    };
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) return;
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        const user = await auth.currentUser;
        await user.updateProfile({
          displayName: this.nickName
        });
        const ref = db.collection('user');
        await ref.doc(user.uid).set({
          providerIcon: 'mdi-email',
          name: user.displayName,
          photoURL: null,
          email: user.email,
          userRank: 0,
          createDate: new Date(),
          updateDate: new Date()
        });
      } catch (error) {
        throw Error(error.massage);
      } finally {
        // this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  &.sign-up-form {
    opacity: 0;
    z-index: 1;
  }

  &.sign-in-form {
    z-index: 2;
  }

  .signForm {
    width: 100%;
    max-width: 500px;
  }

  h1,
  h2,
  h3 {
    color: #0063b2;
  }

  .btn-confim {
    color: #9cc3d5;
  }
}
</style>
