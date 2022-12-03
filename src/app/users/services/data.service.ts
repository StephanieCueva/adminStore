import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  Firestore,
  addDoc,
  getDocs,
  query,
  collection,
  orderBy,
  collectionData,
  doc,
  deleteDoc,
  getDoc,
  getFirestore,
  where,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getAllUsuarios(): Observable<any[]> {
    let usuarioRef = query(
      collection(this.firestore, 'usuarios'),
      orderBy('apellido', 'asc')
    );
    return collectionData(usuarioRef, { idField: 'id_doc' }) as Observable<
      any[]
    >;
  }

  deleteUsuario(usuario: any) {
    let docRef = doc(this.firestore, 'usuarios', usuario.id_doc);
    return deleteDoc(docRef);
  }

  addUsuarios(usuario: any) {
    usuario.id = doc(collection(this.firestore, 'usuarios')).id;
    return addDoc(collection(this.firestore, 'usuarios'), usuario);
  }

  getUsuario(id: string): Observable<any[]> {
    const usuarioRef = query(
      collection(this.firestore, 'usuarios'),
      where('id', '==', id)
    );
    return collectionData(usuarioRef) as Observable<any[]>;
  }

  updateUsuario(usuario: any, id_doc: string) {
    const docRef = doc(this.firestore, 'usuarios', id_doc);
    return setDoc(docRef, usuario, { merge: true });
  }
}
