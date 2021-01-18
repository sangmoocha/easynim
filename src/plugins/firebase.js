import Vue from 'vue';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebase.conifg';

// Firebae 리소스 로드
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase 축약
export const auth = firebase.auth();
export const db = firebase.firestore();
export const rdb = firebase.database();

// 명시적으로 설정하는 대신 기본 브라우저 환경 설정을 적용합니다.
auth.useDeviceLanguage();

Vue.prototype.$firebase = firebase;

export default firebase;
