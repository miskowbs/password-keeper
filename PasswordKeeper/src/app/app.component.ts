import { Component, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  showSignOut = true;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.subscribe((auth: FirebaseAuthState) => {
      if (auth) {
        this.showSignOut = true;
      } else {
        this.showSignOut = false;
      }
    })
  }
  
  signOut(): void {
    console.log("TODO: Sign out");
  }
  ngOnDestroy(): void {
    this.afAuth.unsubscribe();
  }
}
