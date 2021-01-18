<template>
  <v-form ref="form" lazy-validation class="sign-in-form">
    <div class="signForm">
      <v-card-title>
        <h1>Sign in</h1>
      </v-card-title>
      <v-list-item three-line>
        <v-list-item-content>
          <v-col>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              rounded
              label="E-Mail"
              append-icon="mdi-email"
              solo
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[rules.required, rules.min(6)]"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              rounded
              solo
              elevation="1"
              label="Password"
            ></v-text-field>
          </v-col>
        </v-list-item-content>

        <v-list-item-avatar size="9rem">
          <v-btn color="#0063b2" @click="login">
            Login
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions class="mb-4 ml-5">
        <h2>Forgot your password ?</h2>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              large
              rounded
              v-bind="attrs"
              v-on="on"
              color="#0063b2"
              class="ml-10 btnReset px-5"
            >
              <v-icon class="mr-3">
                mdi-account-key
              </v-icon>
              reset
            </v-btn>
          </template>
          <span>Reset password</span>
        </v-tooltip>
      </v-card-actions>

      <v-card-title>
        <h2>Or Sign in with social platforms</h2>
      </v-card-title>
      <social />
    </div>
  </v-form>
</template>

<script>
import Social from './Social';
import { auth, db } from '../../plugins/firebase';
export default {
  components: {
    Social
  },
  data() {
    return {
      show: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value.trim() || 'Required.',
        min: len => value =>
          (value ? value.length : 0) >= len || `Min ${len}  characters.`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        }
      }
    };
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        const user = await auth.currentUser;

        if (user) {
          const ref = await db.collection('user');
          const doc = await ref.doc(user.uid).get();
          if (doc.exists) {
            await ref.doc(user.uid).update({ updateDate: new Date() });
          }
        }
      } catch (error) {
        console.error(error.massge);
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
  padding: 0rem 1rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  .signForm {
    width: 100%;
    max-width: 600px;
  }
  &.sign-up-form {
    opacity: 0;
    z-index: 1;
  }

  &.sign-in-form {
    z-index: 2;
  }

  h1,
  h2,
  h3 {
    color: #0063b2;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 100%;
    min-width: 80%;
  }
  .btnReset {
    color: #9cc3d5;
  }
  .v-btn.v-size--default {
    font-size: 1.5rem;
    color: #9cc3d5;
  }
}
</style>
