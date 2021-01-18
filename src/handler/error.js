import Vue from 'vue';

Vue.config.errorHandler = error => {
  Vue.prototype.$toasted.global.error(error.message);
};
