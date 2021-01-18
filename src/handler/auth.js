import { auth, db } from '../plugins/firebase';
import store from '../store';

export default class AuthHandler {
  constructor() {
    this.run();
  }
  async run() {
    await auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('user')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              store.commit('setUserInfo', doc.data());
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        store.commit('setUser', user);
      }
    });
  }
}
