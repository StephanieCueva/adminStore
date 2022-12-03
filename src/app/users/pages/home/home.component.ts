import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['.container { margin: 20px; }'],
})
export class HomeComponent implements OnInit {
  userEmail: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      console.log('usersss', user);
    });
    this.afAuth.onAuthStateChanged((user) => {
      console.log(user);
      this.userEmail = user?.email || '';
      if (!user) {
        this.router.navigate(['auth/login']);
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      // Sign-out successful.
      this.router.navigate(['auth/login']);
    });
  }
}
