import { Injectable } from '@angular/core';

//import { Firestore, collection, addDoc } from 'firebase/firestore';
import { User } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  // getUsers() {
  //   return this.firestore.collection('users').snapshotChanges();
  // }

  addUser(user: User) {
    return this.afs
      .collection('users')
      .add(user)
      .then(() => {
        alert('guardado' + user);
      });
  }
  getUsers() {
    return this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  editUser(user: User, id: string | any) {
    console.log('editando', user);
    // const docRef = doc(this.firestore, 'usuarios', id);
    // return setDoc(docRef, user, { merge: true });
    return this.afs.collection('users').doc(id).update(user);

    //return this.afs.collection('users').doc(user.id).update(user);
  }

  getUserEmail(email: string) {
    return this.afs
      .collection('users', (ref) => ref.where('email', '==', email))
      .snapshotChanges();
  }

  deleteUser(user: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.afs.collection('users').doc(user.id).delete();
        resolve(result);
      } catch (error: any) {
        reject(error.message);
      }
    });
    //return this.afs.collection('users').doc(user.email).delete();
  }
}
