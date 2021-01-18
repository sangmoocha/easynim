<template>
  <!-- <v-main> -->
  <v-card class="d-flex justify-center align-center fill-height">
    <div class="containers">
      <div class="forms-container">
        <div class="signin-signup">
          <sign-in />
          <sign-up />
        </div>
      </div>
      <div class="btn-home">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab color="#0063b2" @click="$router.push('/')">
              <v-icon v-bind="attrs" v-on="on">
                mdi-home
              </v-icon>
            </v-btn>
          </template>
          <span>Go Home</span>
        </v-tooltip>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h1 class="mb-5">Are you still not a member ?</h1>
            <!-- <p>
              Are you still not a member?
            </p> -->
            <v-btn rounded @click="signUp" v-if="toggle">
              Sign up
            </v-btn>
          </div>
          <img src="../assets/butterfly.png" class="image" alt="butterfly" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h1 class="mb-5">Already registered as a member ?</h1>
            <v-btn rounded @click="signIn" v-if="!toggle">
              Sign in
            </v-btn>
          </div>
          <img src="../assets/skull.png" class="image" alt="skull" />
        </div>
      </div>
    </div>
  </v-card>
  <!-- </v-main> -->
</template>

<script>
import SignIn from '../components/auth/SignIn.vue';
import SignUp from '../components/auth/SignUp.vue';
import { auth } from '../plugins/firebase';

export default {
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      toggle: true
    };
  },
  methods: {
    signUp() {
      this.changeForm = !this.changeForm;
      const container = document.querySelector('.containers');
      container.classList.add('sign-up-mode');
      this.toggle = !this.toggle;
    },
    signIn() {
      this.changeForm = !this.changeForm;
      const container = document.querySelector('.containers');
      container.classList.remove('sign-up-mode');
      this.toggle = !this.toggle;
    }
  },
  async created() {
    await auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.$router.push('/myhome');
      }
    });
  }
};
</script>

<style lang="scss">
.theme--light.v-card {
  background-color: #9cc3d5;
}
.containers {
  position: absolute;
  width: 100%;
  background-color: #9cc3d5;
  height: 100%;
  overflow: hidden;
  max-height: 1080px;

  &:before {
    content: '';
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #0063b2 0%, #0063b2 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }
}

.btn-home {
  position: absolute;
  top: 8%;
  left: 98%;
  margin: -50px 0 0 -50px;
  transition: 1.8s ease-in-out;
  z-index: 1;
  .v-btn {
    width: 3.5rem;
    height: 3.5rem;
    .v-icon {
      font-size: 2.5rem;
      color: #9cc3d5;
    }
  }
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.image {
  max-width: 300px;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel {
  .content {
    color: #9cc3d5;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  // h2 h3 {
  //   font-weight: 600;
  //   line-height: 1;
  //   font-size: 1.5rem;
  // }

  // p {
  //   font-size: 1rem;
  //   padding: 0.7rem 0;
  // }

  .v-btn:not(.v-btn--round).v-size--default {
    background-color: #9cc3d5;
  }
  .v-btn__content {
    color: #0063b2;
  }
}

.right-panel {
  .image,
  .content {
    transform: translateX(2000px);
  }
}

/* ANIMATION */

.containers.sign-up-mode {
  &:before {
    transform: translate(100%, -50%);
    right: 50%;
  }
  .btn-home {
    left: 5rem;
  }

  .left-panel {
    .image,
    .content {
      transform: translateX(-2000px);
    }
  }

  .signin-signup {
    left: 25%;
  }

  form {
    &.sign-up-form {
      opacity: 1;
      z-index: 2;
    }

    &.sign-in-form {
      opacity: 0;
      z-index: 1;
    }
  }

  .right-panel {
    .image {
      transform: translateX(-30%);
    }
    .content {
      transform: translateX(0%);
    }
  }

  .left-panel {
    pointer-events: none;
  }

  .right-panel {
    pointer-events: all;
  }
}

@media (max-width: 1023px) {
  .containers {
    min-height: 800px;
    height: 100%;

    &:before {
      width: 1500px;
      height: 1500px;
      transform: translateX(-50%);
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }
  }

  .btn-home {
    top: 35%;
    left: 95%;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
    left: 50%;
  }

  .containers.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel {
    .content {
      padding-right: 15%;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.8s;
    }

    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.7rem;
      padding: 0.5rem 0;
    }
  }

  .containers.sign-up-mode {
    &:before {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }

    .left-panel {
      .image,
      .content {
        transform: translateY(-300px);
      }
    }

    .right-panel {
      .image,
      .content {
        transform: translateY(0px);
      }
    }
  }

  .right-panel {
    .image,
    .content {
      transform: translateY(300px);
    }
  }

  .containers.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .containers {
    padding: 1.5rem;

    &:before {
      bottom: 72%;
      left: 50%;
    }

    &.sign-up-mode:before {
      bottom: 28%;
      left: 50%;
    }
  }
}
</style>
