import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { History } from 'history';
import { IAuthFireBaseResponse } from '../interface';

class Firebase {
  private auth;

  private firestore;

  private storage;

  constructor() {
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }

  public getAuth() {
    return this.auth;
  }

  public logout(history: History) {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
        .then(() => {
          localStorage.removeItem('user-token-elearning');
          history.push('/');
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public authentication(email: string, password: string)
    : Promise<IAuthFireBaseResponse> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          if (res.user) {
            const userData = {
              displayName: res.user.displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
              emailVerified: res.user.emailVerified,
              uid: res.user.uid,
              phoneNumber: res.user.phoneNumber,
              isAnonymous: res.user.isAnonymous,
              token: await res.user.getIdToken(),
            };

            localStorage.setItem('user-token-elearning', userData.token);
            resolve(userData);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public readUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').where('email', '==', email).get()
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getUserDataByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').where('email', '==', email).get()
        .then((docRef) => {
          docRef.forEach((doc) => {
            resolve(doc.data());
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public addDocumentToCollections(table: string, doc: any) {
    return new Promise((resolve, reject) => {
      this.firestore.collection(table).add(doc)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public uploadPPT(slideName: string, file: any) {
    const uploadTask = this.storage.ref(`ppt/${slideName}`).put(file);
    return uploadTask;
  }
}

export default Firebase;
