import Vue from 'vue';
// vue에 플러그인을 등록
import Toasted from 'vue-toasted';

// 당신은 또한 옵션을 전달할 수 있습니다 아래의 옵션 참조 확인
Vue.use(Toasted, {
  // 사용되는 아이콘 팩 유형
  // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
  // eslint-disable-next-line prettier/prettier
  iconPack: 'mdi',
  position: 'top-right'
});

// 옵션 등록
let options = {
  action: {
    text: 'close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0);
    }
  }
};
// 메세지 등록
Vue.toasted.register(
  'error',
  payload => {
    return payload;
  },
  {
    icon: 'mdi-alert',
    duration: 8000,
    theme: 'toasted-primary',
    action: {
      text: 'close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  }
);

// 메세지 등록
Vue.toasted.register(
  'notice',
  payload => {
    return payload;
  },
  {
    icon: 'mdi-bell',
    duration: 4000,
    options
  }
);
