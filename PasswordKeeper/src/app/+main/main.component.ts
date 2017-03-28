import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { Password } from "../password.model";
import { PasswordDialogComponent } from "../password-dialog/password-dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  passwordStream: FirebaseListObservable<Password[]>;
  firebasePath: string;

  private authSubscription: Subscription;
  constructor(
    private af: AngularFire,
    private router: Router,
    private dialog: MdDialog) {
    this.authSubscription = af.auth.subscribe((auth: FirebaseAuthState) => {
      if (auth) {
        console.log("You are signed in. All is good.");
        this.firebasePath = `/users/${auth.uid}`;
        this.passwordStream = this.af.database.list(this.firebasePath);
      } else {
        console.log("Not signed in. Bounce to /signin");
        this.router.navigate(['/signin']);
      }
    });
  };

  ngOnInit() {
  }

  get numberColumns(): number {
    if (window.innerWidth < 500) {
      return 1;
    } else if (window.innerWidth < 900) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
    }
  }

  showAddPasswordDialog() {
    console.log("TODO: Show a dialog");
    var dialogConfig = new MdDialogConfig();
    dialogConfig.data = { firebasePath: this.firebasePath };
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
