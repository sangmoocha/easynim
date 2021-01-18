<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id" :class="[`${item.className}`]">
        <div class="bg">
          <div class="test">
            <user-avatar v-if="item.name == 'item3'" />
            <h3 v-else>
              {{ `${item.name}` }}
            </h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import UserAvatar from '../components/auth/UserAvatar.vue';
export default {
  components: { UserAvatar },
  name: 'HelloWorld',
  data() {
    return {
      items: [
        { className: 'item1', name: 'item1' },
        { className: 'item2', name: 'item2' },
        { className: 'item3', name: 'item3' },
        { className: 'item4', name: 'item4' },
        { className: 'item5', name: 'item5' }
      ]
    };
  },
  methods: {
    info() {
      this.$toasted.show('Toasted !!', {
        theme: 'toasted-primary',
        icon: 'mdi-alert',
        position: 'top-right',
        duration: 50000,
        action: {
          text: 'close',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  position: relative;
  padding: 0;
  margin: 0;
  width: 600px;
  height: 150px;

  li {
    padding: 0;
    list-style: none;
    position: absolute;
    width: 200px;
    height: 200px;
    border: 5px solid #195190;
    transform: rotate(45deg);
    transition: 0.5s;
    margin: -100px;
    -webkit-filter: grayscale(0%);
    filter: none;
    &:hover {
      -webkit-filter: grayscale(100%);
      filter: gray;
    }

    &.item1 {
      top: 0;
      left: 0;
    }

    &.item2 {
      bottom: 0;
      left: 25%;
    }

    &.item3 {
      top: 0;
      left: 50%;
      background-color: #195190;
    }

    &.item4 {
      bottom: 0;
      left: 75%;
    }

    &.item5 {
      top: 0;
      left: 100%;
    }
    .bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .test {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
