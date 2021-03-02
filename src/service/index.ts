import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { History } from 'history';
import { IAuthFireBaseResponse } from '../interface';
import { IUserModels } from '../interface/model';
import User from '../models/User';

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
      this.firestore.collection('users').where('user_email', '==', email).get()
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getUserDataByEmail(email: string): Promise<IUserModels> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('users').where('user_email', '==', email).get()
        .then((docRef) => {
          if (docRef.empty) {
            const user = new User();
            resolve(user.getAttributes());
          }
          docRef.forEach((doc) => {
            const { id } = doc;
            const data = doc.data();
            resolve({ ...data, id });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public addDocumentToCollections<T>(table: string, doc: T): Promise<any> {
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

  public deleteDocumentToCollections(table: string, doc: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection(table).doc(doc).delete()
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getDocumentsFromCollections<T>(table: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.firestore.collection(table).get()
        .then((docRef) => {
          const list: any = [];

          if (docRef.empty) {
            resolve(list);
          }
          docRef.forEach((doc) => {
            const { id } = doc;
            list.push({ id, ...doc.data() });
            resolve(list);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getDocumentsFromCollectionsById<T>(table: string, id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.firestore.collection(table).doc(id).get()
        .then((docRef) => {
          if (docRef.exists) {
            const objId = docRef.id;
            resolve({ ...docRef.data(), objId });
          } else {
            throw new Error('Data not found ...');
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public updateDocumentsFromCollections<T>(table: string, doc: T, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.collection(table).doc(id).update(doc)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public updateProfileSetting(doc: IUserModels, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const userNow = this.auth.currentUser;
      if (userNow) {
        userNow.updateProfile({
          displayName: doc.user_full_name,
          photoURL: doc.user_photo_url,
        })
          .then(() => {
            this.updateDocumentsFromCollections<IUserModels>('users', doc, id)
              .then((docRef) => {
                resolve(docRef);
              })
              .catch((err) => {
                reject(err);
              });
          }, (err) => {
            reject(err);
          });
      }
    });
  }

  public updatePassword(email: string, oldPassword: string, newPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, oldPassword)
        .then(async (res) => {
          if (res.user) {
            res.user.updatePassword(newPassword)
              .then(() => {
                resolve(res.user);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            throw new Error('your old password are incorrect !');
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public sendResetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.sendPasswordResetEmail(email)
        .then(() => {
          resolve({});
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public sendVerificationEmail(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      if (user) {
        user.sendEmailVerification()
          .then(() => {
            resolve({});
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        throw new Error('Session expired please relogin again ...');
      }
    });
  }

  public uploadPPT(slideName: string, file: any) {
    const uploadTask = this.storage.ref(`ppt/${slideName}`).put(file);
    return uploadTask;
  }
}

export default Firebase;
